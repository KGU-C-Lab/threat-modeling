import ExplainCard from "@/components/common/ExplainCard/ExplainCard";
import Section from "@/components/common/Section/Section";
import explainData from "./explainData.json";

const makeNextLine = (text: string) => {
  return text.split("\n").map((line, index) => (
    <span key={index}>
      {line}
      <br />
    </span>
  ));
};

const ExplainSection = () => {
  return (
    <Section>
      <div className="flex justify-between">
        {explainData.map(({ id, badge, title, description }) => (
          <ExplainCard
            key={id}
            id={id}
            badge={badge}
            title={title}
            description={makeNextLine(description)}
          />
        ))}
      </div>
    </Section>
  );
};

export default ExplainSection;
