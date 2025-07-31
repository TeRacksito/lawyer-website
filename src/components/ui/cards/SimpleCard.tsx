export interface ISimpleCardProps {
  title: string;
  children?: React.ReactNode;
}

export default function SimpleCard(props: ISimpleCardProps) {
  return (
    <div className="card bg-base-200 shadow">
      <div className="card-body">
        <h3 className="card-title">{props.title}</h3>
        {props.children ? props.children : ""}
      </div>
    </div>
  );
}
