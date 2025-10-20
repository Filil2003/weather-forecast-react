import * as Dialog from "@radix-ui/react-dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { useEffect, useState } from "react";
import { Button, Heading, Icon, Text } from "#shared/ui";
import styles from "./DisclaimerDialog.module.css";

export function DisclaimerDialog() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(true);
  }, []);

  return (
    <Dialog.Root onOpenChange={setOpen} open={open}>
      <DialogTrigger asChild>
        <Button className={styles.trigger} shape="round">
          <Icon.Common name="warning" />
        </Button>
      </DialogTrigger>
      <Dialog.Portal>
        <Dialog.Overlay className={styles.overlay} />
        <Dialog.Content className={styles.content}>
          <Dialog.Close asChild>
            <Button className={styles.close} shape="round">
              <Icon.Common name="cross" />
            </Button>
          </Dialog.Close>
          <Icon.Common className={styles.icon} name="warning" size="4em" />
          <Dialog.Title asChild>
            <Heading as="h2" className={styles.title}>
              В разработке
            </Heading>
          </Dialog.Title>
          <Dialog.Description asChild>
            <div className={styles.description}>
              <Text as="p">
                Этот проект — личная песочница, где я экспериментирую
                с технологиями, дизайном и организацией разработки.
              </Text>
              <Text as="p">
                Постепенно превращаю его в полноценное приложение.
              </Text>
              <Text as="p">Исходный код и макет доступны ниже.</Text>
            </div>
          </Dialog.Description>

          <div className={styles.links}>
            <Button
              href={import.meta.env.VITE_CODE_URL}
              rel="noopener noreferrer"
              target="_blank"
              type="link"
            >
              <Icon.Socials name="github" /> GitHub
            </Button>
            <Button
              href={import.meta.env.VITE_DESIGN_URL}
              rel="noopener noreferrer"
              target="_blank"
              type="link"
            >
              <Icon.Socials name="figma" /> Figma
            </Button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
