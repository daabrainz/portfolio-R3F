const SkillSection = () => {
    return (
      <Section>
        <motion.div whileInView={"visible"} className="w-full">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-50 mb-8">Skills</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 perspective-1000">
            {skills.map((skill, index) => (
              <motion.div
                key={index}
                className="relative h-40 w-full transform-style-3d"
                initial={{ opacity: 0, rotateY: -90 }}
                variants={{
                  visible: {
                    opacity: 1,
                    rotateY: 0,
                    transition: { 
                      type: "spring", 
                      stiffness: 50, 
                      damping: 15,
                      delay: index * 0.15 
                    }
                  }
                }}
                whileHover={{ 
                  rotateY: 15, 
                  rotateX: -5,
                  z: 50,
                  transition: { duration: 0.4 }
                }}
              >
                <div 
                  className="absolute inset-0 bg-gradient-to-br from-indigo-800/60 to-purple-600/60 backdrop-blur-sm 
                             rounded-xl p-6 border border-white/20 shadow-xl flex flex-col justify-between"
                  style={{ 
                    transform: `translateZ(20px)`,
                    backgroundImage: `radial-gradient(circle at top right, rgba(255,255,255,0.15), transparent)`
                  }}
                >
                  <h3 className="text-xl font-bold text-white">{skill.title}</h3>
                  
                  <div className="mt-auto">
                    <div className="h-2 w-full bg-gray-700/50 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-white/80"
                        style={{ width: `${skill.level}%` }}
                        initial={{ width: 0 }}
                        variants={{
                          visible: {
                            width: `${skill.level}%`,
                            transition: { duration: 1, delay: index * 0.2 + 0.5 }
                          }
                        }}
                      />
                    </div>
                    <div className="flex justify-between mt-2 text-xs font-medium text-white/70">
                      <span>Beginner</span>
                      <span>Expert</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
  
          {/* CSS in index.css */}
          {/* 
            .perspective-1000 {
              perspective: 1000px;
            }
            .transform-style-3d {
              transform-style: preserve-3d;
            }
          */}
        </motion.div>
      </Section>
    );
  };

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