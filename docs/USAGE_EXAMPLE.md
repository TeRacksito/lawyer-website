# Ejemplo de Uso del Sistema de Notificaciones

## Configuración Rápida

### 1. Variables de Entorno

Crear archivo `.env.local` con:

```bash
# Azure AD Configuration
AZURE_TENANT_ID=tu-tenant-id-aqui
AZURE_CLIENT_ID=tu-client-id-aqui
AZURE_CLIENT_SECRET=tu-client-secret-aqui

# Email Configuration
EMAIL_SENDER=noreply@tudominio.es
NOTIFICATION_GROUP_EMAIL=notificaciones@tudominio.es
```

### 2. Verificar Configuración

```bash
# Instalar dependencias si es necesario
npm install

# Ejecutar en desarrollo
npm run dev

# O con wrangler
wrangler dev
```

## Flujo de Usuario

### 1. Usuario Envía Formulario

```http
POST /api/send
Content-Type: application/json

{
  "name": "Juan",
  "surname": "Pérez",
  "email": "juan.perez@example.com",
  "subject": "Consulta sobre contrato de arrendamiento",
  "body": "Necesito asesoría legal sobre un contrato de arrendamiento que firmé hace 2 meses...",
  "category": "Derecho Inmobiliario",
  "tags": ["urgente", "contrato", "arrendamiento"]
}
```

### 2. Sistema Procesa

El sistema realiza las siguientes acciones automáticamente:

#### 2.1. Guardar en KV Storage
```
✓ Notificación guardada en Cloudflare KV
```

#### 2.2. Email de Confirmación al Usuario
```
To: juan.perez@example.com
Subject: Confirmación: Hemos recibido tu consulta - Consulta sobre contrato...

[Email HTML formateado con los detalles de su consulta]
```

#### 2.3. Email al Grupo de Notificaciones
```
To: notificaciones@tudominio.es
Subject: Nueva consulta: Consulta sobre contrato de arrendamiento

[Email HTML con detalles completos de la consulta]
```

#### 2.4. Tarea To-Do para Cada Usuario

Cada usuario activo de la organización recibe en su lista "Notificaciones Automáticas":

```
✓ Tarea creada
  Título: Nueva consulta: Consulta sobre contrato de arrendamiento
  Descripción:
    De: Juan Pérez (juan.perez@example.com)
    
    Asunto: Consulta sobre contrato de arrendamiento
    
    Mensaje:
    Necesito asesoría legal sobre un contrato de arrendamiento...
    
    ID: notification-1732377600000
```

#### 2.5. Evento de Calendario para Cada Usuario

Cada usuario activo recibe un evento en su calendario:

```
✓ Evento creado
  Asunto: Consulta recibida: Consulta sobre contrato de arrendamiento
  Fecha: [Fecha y hora de recepción]
  Duración: 10 minutos
  Recordatorio: Activado
  
  Descripción:
    Nueva consulta de: Juan Pérez
    Email: juan.perez@example.com
    Asunto: Consulta sobre contrato de arrendamiento
```

### 3. Respuesta del Sistema

```json
{
  "status": "sent",
  "message": "Confirmation email sent and notifications processed for organization"
}
```

## Logs del Sistema

### Logs Exitosos

```
[API] POST /api/send - Request received
[API] Getting Cloudflare context
[API] Cloudflare context obtained { hasKV: true, hasEmailAdmin: true }
[API] Parsing request body
[API] Form data parsed: { hasName: true, hasSurname: true, ... }
[API] Adding notification to KV storage
[KV] Adding notification to storage
[KV] Writing 1 notifications to storage
[KV] Compressed size: 456 bytes
[KV] Notifications written in single block
[KV] Notification added successfully
[API] Notification stored successfully
[API] Sending confirmation email to user
[Email] Starting email send process
[Email] Requesting access token from Microsoft Graph
[Email] Access token obtained successfully
[Email] Sending email via Microsoft Graph API
[Email] Email sent successfully
[API] Confirmation email sent successfully
[API] Processing notification for organization users
[Notification] Starting notification process
[Email] Requesting access token from Microsoft Graph
[Email] Access token obtained successfully
[Notification] Step 1: Sending email to notification group
[Email] Starting email send process
[Email] Sending email via Microsoft Graph API
[Email] Email sent successfully
[Notification] Step 2: Getting active users
[Graph] Listing active users from organization
[Graph] Found 12 active users (excluding noreply@tudominio.es)
[Notification] Processing 12 users
[Notification] Step 3: Creating To-Do tasks and calendar events in batches
[Notification] Processing 2 batches of users
[Notification] Processing batch 1/2
[Graph] Getting/creating To-Do list "Notificaciones Automáticas" for user abc123...
[Graph] Found existing list: def456...
[Graph] Getting/creating To-Do list "Notificaciones Automáticas" for user ghi789...
[Graph] Created new list: jkl012...
... (continúa para cada usuario)
[Graph] Executing batch with 12 requests
[Graph] Batch executed successfully
[Notification] Batch 1 completed: 12/12 successful
[Notification] Processing batch 2/2
... (continúa)
[Notification] Batch 2 completed: 12/12 successful
[Notification] Notification process completed
[API] Organization notification completed
[API] Request completed successfully
```

## Pruebas

### Test 1: Formulario Válido

```bash
curl -X POST http://localhost:3000/api/send \
  -H "Content-Type: application/json" \
  -d '{
    "name": "María",
    "surname": "García",
    "email": "maria.garcia@example.com",
    "subject": "Consulta sobre derecho laboral",
    "body": "Tengo dudas sobre mi finiquito...",
    "category": "Derecho Laboral"
  }'
```

**Resultado Esperado:**
```json
{
  "status": "sent",
  "message": "Confirmation email sent and notifications processed for organization"
}
```

### Test 2: Formulario Incompleto

```bash
curl -X POST http://localhost:3000/api/send \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Pedro",
    "email": "pedro@example.com"
  }'
```

**Resultado Esperado:**
```json
{
  "error": "Missing required fields"
}
```

### Test 3: Verificar Email en Outlook

1. Abrir Outlook Web o aplicación
2. El grupo "Notificaciones" debe tener un nuevo email
3. Revisar To-Do → Lista "Notificaciones Automáticas"
4. Revisar Calendario → Debe haber un nuevo evento

## Troubleshooting

### Problema: "Failed to get access token"

**Causa**: Credenciales de Azure incorrectas

**Solución**:
```bash
# Verificar variables
echo $AZURE_TENANT_ID
echo $AZURE_CLIENT_ID
echo $AZURE_CLIENT_SECRET

# Deben tener valores válidos
```

### Problema: "Failed to send email"

**Causa**: EMAIL_SENDER no tiene buzón o permisos

**Solución**:
1. Verificar que la cuenta existe
2. Verificar que tiene licencia Exchange
3. Verificar permisos en Azure AD

### Problema: "Failed to create To-Do task"

**Causa**: Usuario sin licencia To-Do o permisos insuficientes

**Solución**:
1. Verificar permisos `Tasks.ReadWrite.All` en Azure AD
2. Verificar que el usuario tiene licencia Microsoft 365
3. Revisar logs para ver el error específico

### Problema: Algunos usuarios no reciben notificaciones

**Causa**: Usuarios inactivos o sin buzón

**Solución**:
```typescript
// El sistema ya filtra usuarios inactivos
// Revisar logs para ver qué usuarios se están procesando:
[Graph] Found 12 active users (excluding noreply@tudominio.es)
```

## Verificación Post-Implementación

### Checklist

- [ ] Email de confirmación recibido por el usuario
- [ ] Email al grupo recibido
- [ ] Todos los usuarios activos tienen tarea To-Do
- [ ] Todos los usuarios activos tienen evento calendario
- [ ] Notificación guardada en KV Storage
- [ ] Logs sin errores críticos

### Comandos de Verificación

```bash
# Ver logs en tiempo real (desarrollo)
npm run dev

# Ver logs en Cloudflare (producción)
wrangler tail

# Verificar KV Storage
wrangler kv:list --namespace-id=<your-namespace-id>
```

## Métricas de Éxito

### KPIs a Monitorear

1. **Tasa de Éxito**: % de notificaciones procesadas sin errores
2. **Tiempo de Procesamiento**: Tiempo desde recepción hasta última notificación
3. **Cobertura**: % de usuarios que reciben notificaciones correctamente
4. **Disponibilidad**: Uptime del endpoint

### Dashboard Sugerido

```
┌─────────────────────────────────────┐
│ Notificaciones Hoy: 47              │
│ Tasa de Éxito: 98.5%               │
│ Tiempo Promedio: 5.2s              │
│ Usuarios Notificados: 12/12        │
└─────────────────────────────────────┘
```

## Próximos Pasos

1. **Monitoreo**: Configurar alertas en Cloudflare para errores
2. **Optimización**: Implementar procesamiento asíncrono con Queues
3. **Analytics**: Integrar con sistema de métricas
4. **Testing**: Crear suite de tests automatizados
5. **Documentación**: Mantener actualizada con cambios
