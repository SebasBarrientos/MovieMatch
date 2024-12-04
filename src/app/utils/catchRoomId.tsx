import { usePathname } from "next/navigation";


export const extractIdRoom = () => {

    const regex = /room\/(.*?)\/categories/;
    const pathName = usePathname()
    const matches = pathName.match(regex);
    if (matches) {
      return matches[1];
    } else {
      return null;
    }
  }

  export default extractIdRoom