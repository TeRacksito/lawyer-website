# Configuración de Azure para Sistema de Notificaciones

Este documento explica cómo configurar Azure Active Directory (Entra ID) y Microsoft 365 para que el sistema de notificaciones funcione correctamente.

## Resumen del Sistema

Cuando un usuario envía una consulta a través del formulario de contacto, el sistema:

1. **Envía un email de confirmación al usuario** que envió la consulta
2. **Envía un email al grupo de notificaciones** de la organización (un único email)
3. **Crea una tarea To-Do** para cada usuario activo de la organización
4. **Crea un evento de calendario** para cada usuario activo de la organización

## Requisitos Previos

- Cuenta de Microsoft 365 Business/Enterprise
- Permisos de Administrador Global en Azure AD/Entra ID
- Grupo de distribución o Microsoft 365 Group creado

## Paso 1: Crear el Grupo de Notificaciones

### Opción A: Grupo de Microsoft 365 (Recomendado)

1. Ir al [Centro de administración de Microsoft 365](https://admin.microsoft.com)
2. Navegar a **Equipos y grupos** > **Grupos activos**
3. Hacer clic en **Agregar un grupo**
4. Seleccionar **Microsoft 365** como tipo de grupo
5. Configurar:
   - **Nombre**: "Notificaciones Automáticas" (o el nombre que prefieras)
   - **Correo electrónico**: `notificaciones@tudominio.es` (este será el valor de `NOTIFICATION_GROUP_EMAIL`)
   - **Descripción**: "Grupo para recibir notificaciones automáticas de consultas"
6. Agregar los miembros que deben recibir las notificaciones
7. **Importante**: Configurar el grupo para que envíe copias a las bandejas de entrada de los miembros:
   - Ir a la configuración del grupo
   - Activar "Enviar copias de conversaciones y eventos del grupo a las bandejas de entrada de los miembros"

### Opción B: Lista de Distribución

1. Ir al [Centro de administración de Exchange](https://admin.exchange.microsoft.com)
2. Navegar a **Destinatarios** > **Grupos** > **Listas de distribución**
3. Crear una nueva lista con el email `notificaciones@tudominio.es`
4. Agregar los miembros

## Paso 2: Registrar la Aplicación en Azure AD

1. Ir al [Portal de Azure](https://portal.azure.com)
2. Navegar a **Azure Active Directory** > **Registros de aplicaciones**
3. Hacer clic en **Nuevo registro**
4. Configurar:
   - **Nombre**: "Sistema de Notificaciones CLG" (o el nombre que prefieras)
   - **Tipos de cuenta admitidos**: Solo esta organización
   - **URI de redirección**: Dejar en blanco
5. Hacer clic en **Registrar**

Anotar:
- **ID de aplicación (cliente)**: Este será el valor de `AZURE_CLIENT_ID`
- **ID de directorio (inquilino)**: Este será el valor de `AZURE_TENANT_ID`

## Paso 3: Crear Secreto de Cliente

1. En la aplicación recién creada, ir a **Certificados y secretos**
2. Hacer clic en **Nuevo secreto de cliente**
3. Configurar:
   - **Descripción**: "Secreto para sistema de notificaciones"
   - **Expiración**: 24 meses (o según políticas de tu organización)
4. Hacer clic en **Agregar**
5. **¡IMPORTANTE!** Copiar el **valor** del secreto inmediatamente (no el ID)
   - Este será el valor de `AZURE_CLIENT_SECRET`
   - **No podrás volver a verlo después**

## Paso 4: Configurar Permisos de API

La aplicación necesita los siguientes permisos de **Aplicación** (no delegados):

### Permisos Requeridos:

1. En la aplicación, ir a **Permisos de API**
2. Hacer clic en **Agregar un permiso** > **Microsoft Graph**
3. Seleccionar **Permisos de aplicación**
4. Agregar los siguientes permisos:

   - `User.Read.All` - Para listar usuarios de la organización
   - `Mail.Send` - Para enviar correos desde la cuenta noreply
   - `Tasks.ReadWrite.All` - Para crear tareas To-Do en los usuarios
   - `Calendars.ReadWrite` - Para crear eventos de calendario

5. Hacer clic en **Agregar permisos**
6. **¡IMPORTANTE!** Hacer clic en **Conceder consentimiento de administrador para [Tu Organización]**
7. Confirmar haciendo clic en **Sí**

### Verificación

Todos los permisos deben mostrar una marca verde de "Concedido para [Tu Organización]".

## Paso 5: Configurar la Cuenta de Email Remitente

1. Asegurarse de que existe una cuenta como `noreply@tudominio.es` o `notificaciones@tudominio.es`
2. Esta cuenta debe tener:
   - Licencia de Microsoft 365 con buzón de Exchange
   - Permisos para enviar correos
3. Anotar el email completo: Este será el valor de `EMAIL_SENDER`

## Paso 6: Configurar Variables de Entorno

Agregar las siguientes variables al archivo `.env.local` (desarrollo) o configurar en Cloudflare Workers (producción):

```bash
# Azure AD Configuration
AZURE_TENANT_ID=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
AZURE_CLIENT_ID=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
AZURE_CLIENT_SECRET=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# Email Configuration
EMAIL_SENDER=noreply@tudominio.es
NOTIFICATION_GROUP_EMAIL=notificaciones@tudominio.es
```

### Configurar en Cloudflare Workers

```bash
# Usando wrangler CLI
wrangler secret put AZURE_TENANT_ID
wrangler secret put AZURE_CLIENT_ID
wrangler secret put AZURE_CLIENT_SECRET
wrangler secret put EMAIL_SENDER
wrangler secret put NOTIFICATION_GROUP_EMAIL
```

O desde el Dashboard de Cloudflare:
1. Ir a Workers & Pages
2. Seleccionar tu worker
3. Ir a Settings > Variables
4. Agregar cada variable como "Encrypted"

## Paso 7: Verificar la Configuración

### Test Checklist

- [ ] El grupo de notificaciones existe y tiene miembros
- [ ] La aplicación está registrada en Azure AD
- [ ] Todos los permisos están concedidos con consentimiento de administrador
- [ ] Las variables de entorno están configuradas
- [ ] La cuenta EMAIL_SENDER tiene buzón activo

### Probar el Sistema

1. Enviar una consulta de prueba a través del formulario
2. Verificar que:
   - El usuario recibe un email de confirmación
   - El grupo de notificaciones recibe un email con los detalles
   - Cada usuario activo recibe una tarea To-Do en su lista "Notificaciones Automáticas"
   - Cada usuario activo tiene un evento en su calendario

## Solución de Problemas

### Error: "Failed to get access token"

- Verificar que `AZURE_TENANT_ID`, `AZURE_CLIENT_ID` y `AZURE_CLIENT_SECRET` son correctos
- Asegurarse de que el secreto no ha expirado

### Error: "Failed to list users"

- Verificar que el permiso `User.Read.All` está concedido
- Verificar que el consentimiento de administrador está dado

### Error: "Failed to send email"

- Verificar que el permiso `Mail.Send` está concedido
- Verificar que `EMAIL_SENDER` es una cuenta válida con buzón
- Verificar que `NOTIFICATION_GROUP_EMAIL` existe

### Error: "Failed to create To-Do task"

- Verificar que el permiso `Tasks.ReadWrite.All` está concedido
- Asegurarse de que los usuarios tienen licencias de Microsoft 365 válidas

### Error: "Failed to create calendar event"

- Verificar que el permiso `Calendars.ReadWrite` está concedido
- Asegurarse de que los usuarios tienen buzones de Exchange

### Los usuarios no reciben las notificaciones

- Verificar que los usuarios están activos (`accountEnabled = true`)
- Verificar que no están siendo filtrados por el email noreply
- Revisar los logs para ver qué usuarios se están procesando

## Seguridad y Mejores Prácticas

1. **Rotación de Secretos**: Programar la renovación del secreto antes de que expire
2. **Principio de Menor Privilegio**: Solo otorgar los permisos necesarios
3. **Auditoría**: Revisar regularmente los logs de Azure AD para actividad inusual
4. **Monitoreo**: Configurar alertas en Cloudflare para errores en el endpoint
5. **Backups**: Mantener los IDs y configuraciones en un lugar seguro

## Límites y Consideraciones

- **Límite de Batch**: Microsoft Graph permite máximo 20 sub-requests por batch
- **Throttling**: Microsoft Graph tiene límites de rate-limiting por inquilino
- **Usuarios**: El sistema procesa 6 usuarios por batch (2 operaciones cada uno)
- **Concurrencia**: Los batches se ejecutan secuencialmente para evitar throttling

## Arquitectura del Sistema

```
Usuario envía formulario
         ↓
    [API Endpoint]
         ↓
    ┌────┴────┐
    ↓         ↓
[KV Storage]  [Process Notification]
              ↓
         ┌────┼────┬────────────┐
         ↓    ↓    ↓            ↓
    [Email] [Get] [Create]  [Create]
    to Group Users Tasks    Events
         ↓    ↓    ↓            ↓
    Grupo  Batch Batch      Batch
           Process Process  Process
```

## Recursos Adicionales

- [Microsoft Graph API Documentation](https://learn.microsoft.com/en-us/graph/)
- [Azure AD App Registration](https://learn.microsoft.com/en-us/azure/active-directory/develop/quickstart-register-app)
- [Microsoft Graph Permissions Reference](https://learn.microsoft.com/en-us/graph/permissions-reference)
- [Microsoft Graph Throttling](https://learn.microsoft.com/en-us/graph/throttling)
