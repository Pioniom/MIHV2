import React from 'react';
import { useState } from 'react';
import Div from '../Div';
const accordionData = [
  {
    question: 'Was ist der Unterschied zwischen FUE und DHI Methode?',
    answer:
      'Die FUE (Follicular Unit Extraction) Methode entnimmt einzelne Haarfollikel mit einem speziellen Mikro-Instrument. Bei der DHI (Direct Hair Implantation) Technik werden die Haare direkt mit einem Implanter-Stift eingepflanzt, ohne vorherige Kanäle zu öffnen. DHI ermöglicht eine höhere Haardichte und natürlichere Ergebnisse.',
  },
  {
    question: 'Wie viel kostet eine Haartransplantation bei Medical Inn Hair?',
    answer:
      'Die Kosten variieren je nach Anzahl der benötigten Grafts und der gewählten Methode. FUE-Behandlungen beginnen bei etwa 2.500€, DHI-Behandlungen bei 3.500€. Wir bieten flexible Finanzierungsmöglichkeiten und eine kostenlose Erstberatung an. Gerne erstellen wir Ihnen ein individuelles Angebot.',
  },
  {
    question: 'Wie lange dauert die Heilung nach einer Haartransplantation?',
    answer:
      'Die ersten 7-10 Tage sind entscheidend für die Heilung. Kleine Krusten fallen nach 10-14 Tagen ab. Die transplantierten Haare fallen nach 2-6 Wochen aus (Shock Loss), das ist normal. Erste neue Haare wachsen nach 3-4 Monaten, das endgültige Ergebnis sehen Sie nach 12-18 Monaten.',
  },
  {
    question: 'Wie erreiche ich Medical Inn Hair für eine Beratung?',
    answer:
      'Sie können uns telefonisch unter +49 211 123456 erreichen oder über unser Kontaktformular. Wir bieten kostenlose Erstberatungen an, sowohl persönlich in unserer Düsseldorfer Praxis als auch per Video-Call. Termine sind auch abends und am Wochenende möglich.',
  },
  {
    question: 'Bietet Medical Inn Hair auch SMP und PRP Therapie an?',
    answer:
      'Ja, wir bieten die komplette Palette der Haarbehandlungen an. SMP (Scalp Micro Pigmentation) ist eine nicht-operative Alternative zur Haartransplantation. PRP (Platelet-Rich Plasma) Therapie stärkt vorhandene Haare und unterstützt das Wachstum nach einer Transplantation.',
  },
  {
    question: 'Ist eine Haartransplantation bei Medical Inn Hair dauerhaft?',
    answer:
      'Ja, die transplantierten Haare sind dauerhaft, da sie aus dem Spenderbereich stammen, der genetisch nicht von Haarausfall betroffen ist. Mit unserer FUE Saphir und DHI Technik erreichen wir eine Anwachsrate von über 95%. Die Ergebnisse sind lebenslang haltbar.',
  },
  {
    question: 'Welche Nachsorge ist nach der Haartransplantation nötig?',
    answer:
      'In den ersten 48 Stunden ist besondere Vorsicht geboten. Wir geben Ihnen detaillierte Pflegeanweisungen mit. Nach 10 Tagen erfolgt die erste Kontrolle, weitere Termine nach 1, 3, 6 und 12 Monaten. Unser Nachsorge-Team steht Ihnen jederzeit zur Verfügung.',
  },
  {
    question: 'Ab welchem Alter ist eine Haartransplantation möglich?',
    answer:
      'Eine Haartransplantation ist ab dem 25. Lebensjahr empfehlenswert, da sich der Haarausfall dann meist stabilisiert hat. In Einzelfällen behandeln wir auch jüngere Patienten. Wichtig ist eine ausführliche Voruntersuchung und realistische Erwartungen bezüglich des Ergebnisses.',
  },
];

export default function Accordion() {
  const [selected, setSelected] = useState(0);
  const handelToggle = index => {
    if (selected === index) {
      return setSelected(null);
    }
    setSelected(index);
  };

  return (
    <Div className="cs-accordians cs-style1">
      {accordionData.map((item, index) => (
        <Div
          className={`cs-accordian ${selected === index ? 'active' : ''}`}
          key={index}
        >
          <Div
            className="cs-accordian_head"
            onClick={() => handelToggle(index)}
          >
            <h2 className="cs-accordian_title">{item.question}</h2>
            <span className="cs-accordian_toggle cs-accent_color">
              <svg
                width={15}
                height={8}
                viewBox="0 0 15 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M0 0L7.5 7.5L15 0H0Z" fill="currentColor" />
              </svg>
            </span>
          </Div>
          <Div className="cs-accordian_body">
            <Div className="cs-accordian_body_in">
              <p>{item.answer}</p>
            </Div>
          </Div>
        </Div>
      ))}
    </Div>
  );
}
