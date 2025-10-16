import { Button, Icon, Text } from "#shared/ui";
import styles from "./SearchSuggestions.module.css";

interface Props {
  suggestions:
    | {
        id: number;
        name: string;
        country: string;
      }[]
    | undefined;
  onSelect: (cityName: string) => void;
}

export function SearchSuggestions({ suggestions, onSelect }: Props) {
  if (!suggestions || suggestions.length === 0) return null;

  return (
    <ul className={styles.list}>
      {suggestions.map(({ id, name, country }) => (
        <li className={styles.item} key={id}>
          <Button className={styles.button} onClick={() => onSelect(name)}>
            <Icon.Common name="location" title="Location" />
            <div>
              <Text as="p" weight="medium">
                {name}
              </Text>
              <Text as="p">{country}</Text>
            </div>
          </Button>
        </li>
      ))}
    </ul>
  );
}
