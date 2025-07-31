export interface IBlogLayoutProps {
  children: React.ReactNode;
}

export default function BlogLayout(props: IBlogLayoutProps) {
  return <div>Block Layout: {props.children}</div>;
}
