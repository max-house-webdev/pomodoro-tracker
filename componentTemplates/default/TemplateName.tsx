import React from "react";
import styles from "./TemplateName.module.scss";

export interface ITemplateNameProps {}

export function TemplateName(props: ITemplateNameProps) {
  const {} = props;

  return (
    <div className={styles.templateName} data-testid="TemplateName">
      TemplateName Component
    </div>
  );
}
