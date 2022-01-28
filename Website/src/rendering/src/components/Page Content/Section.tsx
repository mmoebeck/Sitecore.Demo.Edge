import {
  RichText,
  Text,
  Field,
  Link,
  Placeholder,
  LinkField,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentWithChildrenProps } from 'lib/component-props';
import { DropLink } from 'src/interfaces/DropLink';

type SectionProps = ComponentWithChildrenProps & {
  fields: {
    cssClass: DropLink;
    brightness: DropLink;
    title: Field<string>;
    content: Field<string>;
    callToActionLink: LinkField;
  };
};

const Section = (props: SectionProps): JSX.Element => {
  const brightnessCssClass = props.fields?.brightness?.fields.Value.value
    ? `section--${props.fields.brightness.fields.Value.value}`
    : '';
  const customCssClass = props.fields?.cssClass?.fields.Value.value
    ? props.fields.cssClass.fields.Value.value
    : '';
  const customContentCssClass = customCssClass ? `${customCssClass}__content` : '';

  const sectionCssClasses = `section ${brightnessCssClass} ${customCssClass}`;
  const sectionContentCssClasses = `section__content ${customContentCssClass} container`;

  const titleAndContent = props.fields && (
    <>
      <Text tag="h2" field={props.fields.title} className="section__content__title" />
      {props.fields.content && (
        <RichText tag="div" field={props.fields.content} className="section__content__p" />
      )}
    </>
  );

  const placeholder = !!props.rendering && (
    <Placeholder name="jss-section-content" rendering={props.rendering} />
  );

  const callToAction = !!props.fields?.callToActionLink?.value?.href && (
    <Link field={props.fields.callToActionLink} className="btn--main btn--main--round" />
  );

  return (
    <section className={sectionCssClasses}>
      <div className={sectionContentCssClasses}>
        {titleAndContent}
        {placeholder}
        {props.children}
        {callToAction}
      </div>
    </section>
  );
};

export default Section;
