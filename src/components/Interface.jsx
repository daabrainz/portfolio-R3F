import { motion } from "framer-motion";

const Section = (props) => {
  const { children } = props;

  return (
    <motion.section
      className={`
        h-screen w-screen p-8 max-w-screen mx-auto flex flex-col items-start justify-center
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

export const Interface = () => {
  return (
    <div className="flex flex-col items-center w-screen">
      <AboutSection />
      <SkillSection />
      <Section>
        <h1>Projects</h1>
      </Section>
      <ContactSection />
    </div>
  );
};

const AboutSection = () => {
  return (
    <Section>
      <h1 className="text-6xl font-extrabold leading-snug">
        Hi, ich bin
        <br />
        <span className="bg-white px-1 italic">Samuel Feindt</span>
      </h1>
      <motion.p className="text-lg text-gray-600 mt-4"
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
        angehender 3D-Artist & Spieleentwickler.
      </motion.p>
      <motion.button
        className={`bg-indigo-600 text-white py-4 px-8 rounded-lg font-bold text-lg mt-16`}
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
            delay: 2,
        }}
      
      >
        Kontaktiere mich
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
    level: 40,
  },
  {
    title: "3D Modelling",
    level: 50,
  },
  {
    title: "Javascript",
    level: 35,
  },
  {
    title: "Java",
    level: 40,
  },
];

const languages = [
  {
    title: "🇩🇪 German",
    level: 100,
  },
  {
    title: "🇺🇸 English",
    level: 65,
  },
];

const SkillSection = () => {
  return (
    <Section>
      <motion.div whileInView={"visible"}>
        <h2 className="text-5xl font-bold">Skills</h2>
        <div className="mt-8 space-y-4">
          {skills.map((skills, index) => (
            <div className="w-64" key={index}>
              <motion.h3 className="text-xl font-bold text-gray-800"
                initial={{
                    opacity: 0,
                }}
                variants={{
                    visible: {
                        opacity: 1,
                        transition: {
                            duration: 1,
                            delay: 1 + index * 0.2,
                        }
                    }
                }}
              >
                {skills.title}
              </motion.h3>
              <div className="h-2 w-full bg-gray-300 rounded-full mt-2">
                <motion.div
                  className="h-full bg-indigo-500 rounded-full"
                  style={{ width: `${skills.level}%` }}
                  initial={{
                    scaleX: 0,
                    originX: 0,
                  }}

                  variants= {{
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
          <h2 className="text-5xl font-bold mt-10">Sprachen</h2>
          <div className="mt-8 space-y-4">
            {languages.map((lng, index) => (
              <div className="w-64" key={index}>
                <motion.h3 className="text-xl font-bold text-gray-800"
                  initial={{
                      opacity: 0,
                  }}
                  variants={{
                      visible: {
                          opacity: 1,
                          transition: {
                              duration: 1,
                              delay: 2 + index * 0.2,
                          }
                      }
                  }}
                >
                  {lng.title}
                </motion.h3>
                <div className="h-2 w-full bg-gray-300 rounded-full mt-2">
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

const ContactSection = () => {
  return (
    <Section>
      <h2 className="text-5xl font-bold">Kontaktiere mich</h2>
      <div className="mt-8 p-8 rounded-md bg-white w-96 mx-w-full">
        <form>
          <label for="name" className="font-medium text-gray-900 block mb-1">
            Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            className="block w-full rounded-md border-0 text gray-900 shadow-sm ring-1"
          />
          <label
            for="email"
            className="font-medium text-gray-900 block mb-1 mt-8"
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1"
          />
          <label
            for="email"
            className="font-medium text-gray-900 block mb-1 mt-8"
          >
            Message
          </label>
          <textarea name="message" id="message" className="h-32 block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1"/>
          <button className="bg-indigo-600 text-white py-4 px-8 rounded-lg font-bold text-lg mt-8 text">Submit</button>
        </form>
      </div>
    </Section>
  );
};
