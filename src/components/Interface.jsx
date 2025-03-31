import { motion } from "framer-motion";
import { useAtom } from "jotai";
import { currentProjectAtom } from "./Projects";
import { projects } from "./Projects";
import { useForm, ValidationError } from "@formspree/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faArrowLeft,
  faBriefcase,
  faGraduationCap,
} from "@fortawesome/free-solid-svg-icons";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";

const Section = (props) => {
  const { children, mobileTop, fullHeight = true } = props;

  return (
    <motion.section
      className={`
        ${fullHeight ? "h-screen" : "min-h-screen py-16"}
        w-full p-4 md:p-8 mx-auto 
        flex flex-col items-start  ${
          mobileTop ? "justify-start md:justify-center" : "justify-center"
        }
    `}
      initial={{
        opacity: 0,
        y: 50,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        transition: {
          duration: 1,
          delay: 0.6,
        },
      }}
    >
      {children}
    </motion.section>
  );
};

export const Interface = (props) => {
  const { setSection } = props;
  const isMobile = window.innerWidth < 768;

  return (
    <div className="flex flex-col items-center w-screen">
      <AboutSection setSection={setSection} isMobile={isMobile} />
      <SkillSection />
      <ProjectsSection>
        <h1>Projekt</h1>
      </ProjectsSection>
      <MyLifeSection />
      <ContactSection />
    </div>
  );
};

const AboutSection = (props) => {
  const { setSection, isMobile } = props;

  const contactSectionIndex = isMobile ? 6 : 5;

  return (
    <Section mobileTop>
      <h1 className=" text-gray-50 text-3xl md:text-6xl font-extrabold leading-snug mt-8 md:mt-0">
        Hi, i am
        <br />
        <span className="bg-gray-50 text-gray-900 px-3 py-1 italic">
          Samuel Feindt
        </span>
      </h1>
      <motion.p
        className="text-lg text-gray-50 mt-4"
        initial={{
          opacity: 0,
          y: 25,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 1,
          delay: 1.5,
        }}
      >
        aspiring UI/UX-Designer, Game-Developer <br />& 3D-Enthusiast.
      </motion.p>

      <motion.button
        onClick={() => setSection(contactSectionIndex)}
        className={` bg-indigo-600 text-gray-50 py-4 ring-none px-8 rounded-2xl font-bold text-lg mt-4 md:mt-16 hover:scale-110 transition-transform`}
        initial={{
          opacity: 0,
          y: 20,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.5,
          delay: 1.8,
        }}
      >
        Kontakt
      </motion.button>
    </Section>
  );
};

const skills = [
  {
    title: "HTML, CSS",
    level: 70,
  },
  {
    title: "React",
    level: 30,
  },
  {
    title: "ThreeJS / React Three Fiber",
    level: 20,
  },
  {
    title: "3D Modelling",
    level: 50,
  },
  {
    title: "Javascript",
    level: 30,
  },
  {
    title: "Java",
    level: 35,
  },
];

const languages = [
  {
    title: "🇩🇪 Deutsch",
    level: 100,
  },
  {
    title: "🇬🇧 Englisch",
    level: 70,
  },
];

const SkillSection = () => {
  return (
    <Section>
      <motion.div whileInView={"visible"} className="w-full">
        <h2 className="text-3xl md:text-5xl font-bold text-gray-50">Skills</h2>
        <div className="mt-6 space-y-4">
          {skills.map((skills, index) => (
            <div className="w-full md:w-64" key={index}>
              <motion.h3
                className=" text-lg md:text-xl font-bold text-gray-50"
                initial={{
                  opacity: 0,
                }}
                variants={{
                  visible: {
                    opacity: 1,
                    transition: {
                      duration: 1,
                      delay: 1 + index * 0.2,
                    },
                  },
                }}
              >
                {skills.title}
              </motion.h3>
              <div className="h-2 w-full bg-gray-100 rounded-full mt-2">
                <motion.div
                  className="h-full bg-indigo-500 rounded-full"
                  style={{ width: `${skills.level}%` }}
                  initial={{
                    scaleX: 0,
                    originX: 0,
                  }}
                  variants={{
                    visible: {
                      scaleX: 1,
                      transition: {
                        duration: 1,
                        delay: 1 + index * 0.2,
                      },
                    },
                  }}
                />
              </div>
            </div>
          ))}
        </div>
        <div>
          <h2 className="text-3xl md:text-5xl font-bold mt-8 text-gray-50">
            Languages
          </h2>
          <div className="mt-6 space-y-4">
            {languages.map((lng, index) => (
              <div className="w-full md:w-64" key={index}>
                <motion.h3
                  className="text-lg md:text-xl font-bold text-gray-50"
                  initial={{
                    opacity: 0,
                  }}
                  variants={{
                    visible: {
                      opacity: 1,
                      transition: {
                        duration: 1,
                        delay: 2 + index * 0.2,
                      },
                    },
                  }}
                >
                  {lng.title}
                </motion.h3>
                <div className="h-2 w-full bg-gray-100 rounded-full mt-2">
                  <motion.div
                    className="h-full bg-indigo-500 rounded-full"
                    style={{ width: `${lng.level}%` }}
                    initial={{
                      scaleX: 0,
                      originX: 0,
                    }}
                    variants={{
                      visible: {
                        scaleX: 1,
                        transition: {
                          duration: 1,
                          delay: 2 + index * 0.2,
                        },
                      },
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </Section>
  );
};

const ProjectsSection = () => {
  const [currentProject, setCurrentProject] = useAtom(currentProjectAtom);

  const nextProject = () => {
    setCurrentProject((currentProject + 1) % projects.length);
  };

  const previousProject = () => {
    setCurrentProject((currentProject - 1 + projects.length) % projects.length);
  };

  return (
    <Section>
      <div className="flex w-full h-full gap-8 items-end justify-center mb-30">
        <button
          className="text-gray-100 hover:scale-120 transition-transform text-3xl md:text-5xl font-bold transition-color"
          onClick={previousProject}
        >
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>

        <h2 className=" text-gray-50 text-3xl md:text-5xl font-bold">
          Projekte
        </h2>
        <button
          className="text-gray-50 hover:scale-120 transition-transform font-bold text-3xl md:text-5xl transition-color"
          onClick={nextProject}
        >
          <FontAwesomeIcon icon={faArrowRight} />
        </button>
      </div>
    </Section>
  );
};

const TimelineSection = (props) => {
  const { children } = props;

  return (
    <motion.section className="w-full p-4 md:p-8 pt-16 pb-24 flex-col items-start">
      {children}
    </motion.section>
  );
};

const timelineData = [
  {
    title: "Umschulung zum Fachinformatiker für Anwendungsentwicklung",
    company: "Mischok Academy",
    description:
      "Web-Entwicklung, Daten-Management, Spring-Boot, Projekt-Management",
    date: "2024 - heute",
    icon: "education", // work, education, etc.
  },
  {
    title: "Musikproduzent",
    company: "Freelance",
    description: "Sounddesign, Mixing, Mastering",
    date: "2019 - 2024",
    icon: "work",
  },
  {
    title: "Ausbildung zum Kaufmann für Marketingkommunikation",
    company: "trumedia GmbH",
    description: "Projekt-Management, Emotional Branding, Marketing",
    date: "2018 - 2019",
    icon: "education",
  },
];

const AnimatedTimelineElement = ({ data, index }) => {
  const getIcon = (iconType) => {
    switch (iconType) {
      case "work":
        return faBriefcase;
      case "education":
        return faGraduationCap;
      default:
        return faCode;
    }
  };

  const position = index % 2 === 0 ? "left" : "right";

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.3 }}
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.8,
            delay: 0.2 + index * 0.15,
          },
        },
      }}
    >
      <VerticalTimelineElement
        className={`vertical-timeline-element--${data.icon}`}
        contentStyle={{
          background: "rgba(0, 0, 0, 0.5)",
          color: "#fefefe",
          borderRadius: "8px",
          boxShadow: "0 0 0 0px",
          transform: "scale(1)",
          transition: "transform 0.3s ease-out",
          marginBottom: "10px",
        }}
        contentArrowStyle={{
          borderRight: "7px solid rgba(0, 0, 0, 0.5)",
        }}
        position={position} // Diese Zeile ist entscheidend!
        date={data.date}
        dateClassName="mt-0! font-small text-white"
        iconStyle={{
          background: "#4f39f6",
          color: "#fff",
          boxShadow: "0 0 0 0px",
        }}
        icon={<FontAwesomeIcon icon={getIcon(data.icon)} />}
      >
        <h3 className="text-xl font-bold mb-3">{data.title}</h3>
        <h4 className="font-small">{data.company}</h4>
        <p className="font-light">{data.description}</p>
      </VerticalTimelineElement>
    </motion.div>
  );
};

const MyLifeSection = ({ section }) => {
  const isMobile = window.innerWidth < 768;

  return (
    <TimelineSection>
      <motion.h2
        className="text-gray-100 text-3xl md:text-5xl mb-5 font-bold"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Erfahrung
      </motion.h2>

      <VerticalTimeline
        animate={false}
        lineColor="#4f39f6"
        layout={isMobile ? "1-column" : "2-columns"}
      >
        {timelineData.map((item, index) => (
          <AnimatedTimelineElement key={index} data={item} index={index} />
        ))}
      </VerticalTimeline>
    </TimelineSection>
  );
};

const ContactSection = () => {
  const [state, handleSubmit] = useForm("xyzedgre");

  const isVerySmallDevice = window.innerWidth < 375;

  return (
    <Section fullHeight={false} mobileTop={true}>
      <div className="w-full mt-0">
        <h2 className="text-white text-3xl md:text-5xl font-bold">
          Kontakt
        </h2>

        <div className={`bg-white/50 mt-6 p-10 ${isVerySmallDevice ? 'p-2' : 'p-4'} rounded-2xl w-full max-w-md`}>
          {state.succeeded ? (
            <p className="text-center text-lg font-bold">
              Thanks for your message! I will get back to you soon.
            </p>
          ) : (
            <form onSubmit={handleSubmit}>
              <label
                for="name"
                className="font-medium  text-gray-900 block border-none"
              >
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                className="bg-gray-100  block w-full rounded-2xl text gray-900  p-3 mt-1"
              />
              <label
                for="email"
                className="font-medium text-gray-900 block mb-1 mt-8"
              >
                E-Mail
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="bg-gray-100 block w-full rounded-2xl border-0 text-gray-900 p-3"
              />
              <ValidationError
                prefix="Message"
                field="message"
                errors={state.errors}
              />
              <label
                for="email"
                className="font-medium text-gray-900 block mb-1 mt-8"
              >
                Message
              </label>
              <textarea
                name="message"
                id="message"
                className="bg-gray-100 h-32 block w-full rounded-2xl border-none text-gray-900 p-3 resize-none"
              />
              <ValidationError
                className="mt-10 text-red-400"
                errors={state.errors}
              />
              <button
                disabled={state.submitting}
                className="bg-indigo-600 text-white py-4 px-8 rounded-2xl font-bold text-lg mt-8 shadow-2xs hover:scale-110 transition-transform"
              >
                Submit
              </button>
            </form>
          )}
        </div>
      </div>
    </Section>
  );
};
