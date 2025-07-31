export interface IFooterProps {
  dataTheme?: string;
}

export default function Footer(props: IFooterProps) {
  return (
    <footer
      className="bg-muted py-10 px-6 text-center text-sm text-muted-foreground"
      {...(props.dataTheme ? { 'data-theme': props.dataTheme } : {})}
    >
      <p>
      &copy; {new Date().getFullYear()} Luis Cruz. Todos los derechos
      reservados.
      </p>
    </footer>
  );
}
