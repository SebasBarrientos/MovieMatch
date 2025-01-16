import { usePathname } from "next/navigation";


export const ExtractIdRoom = () => {

  const regex = /room\/([^/]+)/;
    const pathName = usePathname()
    const matches = pathName.match(regex);
    if (matches) {
      return matches[1];
    } else {
      return null;
    }
  }

  export default ExtractIdRoom