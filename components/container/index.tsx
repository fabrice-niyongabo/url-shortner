interface IProps {
  children: React.ReactNode;
  className?: string;
}
function Container(props: IProps) {
  return (
    <div
      className={[
        "container mx-auto px-4 sm:px-6 lg:px-8",
        props.className,
      ].join(" ")}
    >
      {props.children}
    </div>
  );
}

export default Container;
