interface IProps {
  title: string;
  children?: React.ReactNode;
}
function PageHeader(props: IProps) {
  return (
    <div className="flex items-center justify-between gap-5">
      <h2 className="text-2xl font-medium">{props.title}</h2>
      {props.children && props.children}
    </div>
  );
}

export default PageHeader;
