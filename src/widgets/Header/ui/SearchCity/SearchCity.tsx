import { useQuery } from "@tanstack/react-query";
import { type ChangeEvent, type FormEvent, useRef, useState } from "react";
import { useDebounce } from "#shared/lib/react";
import { Icon } from "#shared/ui";
import { queries } from "../../api/queries.ts";
import { SearchSuggestions } from "../SearchSuggestions/SearchSuggestions.tsx";
import styles from "./SearchCity.module.css";

interface Props {
  city: string;
  onCityChange: (city: string) => void;
}

/*
 * TODO: Зафиксированные проблемы и предложения
 *  1. (Предложение) Если прошлый ввод не выдал результата, то последующий ввод продолжающий
 *     эту комбинацию не должен опрашивать сервер. Например: 'abc' не выдало результата,
 *     значит для 'abcd' не нужно отправлять запрос;
 *  2. (Предложение) Если список предложений состоит из одного элемента, начать его загрузку заранее,
 *     чтобы избежать экрана загрузки. Для плохого качества сети отключить эту функцию;
 *  3. (Предложение) Добавить в правую часть input крестик для быстрого стирания ввода;
 *  4. (Предложение) Добавить анимацию появления подсказок;
 *  5. (Предложение) Добавить hook state с функцией reset;
 *  6. (Баг) Пока данные не прешли происходит моргание подсказок;
 *  7. (Баг) Задержка debounce также отрабатывает на скрытие подсказок;
 *  8. (Баг) Поиск города происходит только по городу, без страны. Поэтому при выборе
 *     "Москва США", прогноз погоды будет для "Москва Россия";
 *  9. (Баг) Если в поиск задать неправильное название, API может выдать максимально похожий
 *     город, но в строке поиска будет введённое пользователем неверное название;
 * */

export function SearchCity({ city, onCityChange }: Props) {
  const [searchText, setSearchText] = useState("");
  const debouncedSearch = useDebounce(searchText);
  const { data: searchSuggestions } = useQuery(
    queries.search({ q: debouncedSearch }),
  );

  const inputRef = useRef<HTMLInputElement>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (searchText) onCityChange(searchText);
    setSearchText("");
    inputRef.current?.blur();
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    let value = event.target.value;

    // Убираем ведущие пробелы
    value = value.replace(/^\s+/, "");

    // Заменяем последовательности из 2+ пробелов на один
    value = value.replace(/\s{2,}/g, " ");

    setSearchText(value);
  }

  return (
    <div className={styles.searchBar}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <Icon.Common name="search" title="Magnifying glass" />
        <input
          className={styles.input}
          name="city"
          onChange={handleChange}
          placeholder={city}
          ref={inputRef}
          type="search"
          value={searchText}
        />
      </form>
      <SearchSuggestions
        onSelect={(cityName) => {
          setSearchText("");
          onCityChange(cityName);
        }}
        suggestions={searchSuggestions}
      />
    </div>
  );
}
