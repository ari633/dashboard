import img from "../../assets/react.svg";

export function Header() {
  return (
    <div className="flex justify-between pb-10 items-center">
      <h1 className="text-xl">Hello Evano</h1>
      <img
        className="block mx-auto h-10 rounded-full sm:mx-0 sm:shrink-0"
        src={img}
        alt="Woman's Face"
      />
    </div>
  )
}