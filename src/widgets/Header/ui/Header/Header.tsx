import { SearchCity } from "../SearchCity/SearchCity.tsx";
import { Settings } from "../Settings/Settings.tsx";
import styles from "./Header.module.css";

interface Props {
  city: string;
  onCityChange: (city: string) => void;
}

export function Header(props: Props) {
  return (
    <header className={styles.header}>
      <SearchCity {...props} />
      <Settings />
    </header>
  );
}
