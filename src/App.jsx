import React, { useState, useEffect } from 'react'

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [currentArea, setCurrentArea] = useState(0)
  const [isPageLoaded, setIsPageLoaded] = useState(false)
  const [visibleSections, setVisibleSections] = useState(new Set())

  // Page load animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsPageLoaded(true)
    }, 500) // Small delay to ensure page is fully loaded
    
    return () => clearTimeout(timer)
  }, [])

  // Intersection Observer for section animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections(prev => new Set([...prev, entry.target.id]))
            
            // Animate cards with stagger effect
            const cards = entry.target.querySelectorAll('.card-stagger')
            cards.forEach((card, index) => {
              setTimeout(() => {
                card.classList.add('visible')
              }, index * 150) // 150ms delay between cards
            })
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )

    // Observe all sections
    const sections = document.querySelectorAll('section')
    sections.forEach(section => {
      if (section.id) {
        observer.observe(section)
      }
    })

    return () => observer.disconnect()
  }, [])

  // Auto-rotate carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentArea((prev) => (prev + 1) % 5)
    }, 4000) // Change every 4 seconds
    return () => clearInterval(interval)
  }, [])

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMenuOpen(false)
  }

  return (
    <div className={`min-h-screen overflow-x-hidden ${isPageLoaded ? 'page-enter-active' : 'page-enter'}`}>
      {/* Topbar */}
      <div className="py-12 md:py-16 relative" style={{backgroundColor: '#293949'}}>
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex justify-between items-center absolute top-6 md:top-6 left-4 md:left-12 right-4 md:right-12">
            <div className="flex">
              <a href="https://tiktok.com/@la.escuelita.del.abogado" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-200 px-2 md:px-4 py-1 md:py-2 rounded-lg transition-colors flex items-center space-x-1 md:space-x-2" style={{backgroundColor: 'rgba(255,255,255,0.1)'}} onMouseEnter={(e) => e.target.style.backgroundColor = '#56818F'} onMouseLeave={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.1)'}>
                <i className="fab fa-tiktok text-xs md:text-sm"></i>
                <span className="text-xs md:text-sm hidden sm:inline">@la.escuelita.del.abogado</span>
              </a>
            </div>
            <div className="flex">
              <a href="https://wa.me/5491158588382" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-200 px-2 md:px-4 py-1 md:py-2 rounded-lg transition-colors flex items-center space-x-1 md:space-x-2" style={{backgroundColor: 'rgba(255,255,255,0.1)'}} onMouseEnter={(e) => e.target.style.backgroundColor = '#56818F'} onMouseLeave={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.1)'}>
                <i className="fab fa-whatsapp text-xs md:text-sm"></i>
                <span className="text-xs md:text-sm hidden sm:inline">+54 9 11 5858-8382</span>
              </a>
            </div>
          </div>
        </div>
        
        {/* Navbar positioned at bottom of topbar */}
        <nav className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 z-50 w-11/12 max-w-6xl">
          <div className="bg-white shadow-2xl rounded-full px-4 md:px-8 py-4 md:py-8 relative">
            <div className="flex justify-between items-center">
              <button 
                className="lg:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <i className="fas fa-bars text-2xl"></i>
              </button>
              
              <div className="hidden lg:flex space-x-2 xl:space-x-6">
              <button onClick={() => scrollToSection('inicio')} className="nav-btn text-sm lg:text-base">
                Inicio
              </button>
              <button onClick={() => scrollToSection('about')} className="nav-btn text-sm lg:text-base">
                Sobre el Curso
              </button>
              <button onClick={() => scrollToSection('five-in-one')} className="nav-btn text-sm lg:text-base">
                Especialidades
              </button>
              </div>
              
              <div className="text-2xl lg:text-3xl xl:text-4xl font-bold">
                <span style={{color: '#56818F'}}>Dr.</span>
                <span style={{color: '#293949'}}>Tucci</span>
              </div>
              
              <div className="hidden lg:flex space-x-2 xl:space-x-6">
                <button onClick={() => scrollToSection('how-we-do-it')} className="nav-btn text-sm xl:text-base">
                  Metodología
                </button>
                <button onClick={() => scrollToSection('results')} className="nav-btn text-sm xl:text-base">
                  Testimonios
                </button>
                <button onClick={() => scrollToSection('subscription')} className="nav-btn text-sm xl:text-base">
                  Inscripción
                </button>
              </div>
            </div>
            
            {/* Mobile Menu */}
            {isMenuOpen && (
              <div className="lg:hidden absolute top-full left-0 right-0 bg-white shadow-lg border-t border-gray-200 space-y-0">
                <button onClick={() => scrollToSection('inicio')} className="nav-btn block w-full text-left text-sm py-4 px-6 border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  Inicio
                </button>
                <button onClick={() => scrollToSection('about')} className="nav-btn block w-full text-left text-sm py-4 px-6 border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  Sobre el Curso
                </button>
                <button onClick={() => scrollToSection('five-in-one')} className="nav-btn block w-full text-left text-sm py-4 px-6 border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  Especialidades
                </button>
                <button onClick={() => scrollToSection('how-we-do-it')} className="nav-btn block w-full text-left text-sm py-4 px-6 border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  Metodología
                </button>
                <button onClick={() => scrollToSection('results')} className="nav-btn block w-full text-left text-sm py-4 px-6 border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  Testimonios
                </button>
                <button onClick={() => scrollToSection('subscription')} className="nav-btn block w-full text-left text-sm py-4 px-6 hover:bg-gray-50 transition-colors">
                  Inscripción
                </button>
              </div>
            )}
          </div>
        </nav>
      </div>

      {/* Hero Section */}
      <section id="inicio" className={`relative section-fade-in ${visibleSections.has('inicio') ? 'visible' : ''}`}>
        <div className="relative h-screen overflow-hidden">
          <img 
            src="https://www.bbmundo.com/wp-content/uploads/2020/07/hasta-2040-el-65-de-los-alumnos-tendra-acceso-a-la-universidad.jpg" 
            alt="Dr. Tucci - Entrenamiento práctico"
            className="w-full h-full object-cover grayscale"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white max-w-5xl px-6">
              <h4 className="text-2xl md:text-3xl mb-4 uppercase tracking-wider">
                Litigá desde el día uno
              </h4>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
                Entrenamiento práctico 5 en 1 del Dr. Tucci
              </h1>
              <p className="text-lg md:text-xl mb-8 max-w-4xl mx-auto leading-relaxed">
                Todo lo que necesitás para empezar a litigar con criterio, método y resultados. Entrenamiento práctico para empezar a litigar ya. Clases en vivo, modelos listos, simulaciones y soporte 365. Civil, Laboral, Penal, Familia y Sucesiones. Reservá tu lugar.
              </p>
              <button onClick={() => scrollToSection('subscription')} className="btn-primary btn-animate px-8 py-4 text-lg font-semibold rounded-lg">
                Quiero empezar
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className={`py-16 bg-gray-50 section-fade-in ${visibleSections.has('about') ? 'visible' : ''}`}>
        <div className="container mx-auto px-6">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Cupos limitados
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Este es tu punto de partida. Subí de nivel, acelerá tu práctica y conectá con colegas que ya están en cancha.
            </p>
            <button onClick={() => scrollToSection('subscription')} className="btn-primary px-8 py-4 text-lg font-semibold rounded-lg">
              Inscribirme ahora
            </button>
          </div>
        </div>
      </section>

      {/* Is it for you Section */}
      <section className={`py-16 bg-white relative overflow-hidden section-fade-in ${visibleSections.has('is-for-you') ? 'visible' : ''}`} id="is-for-you">
        <div className="container mx-auto px-6">
          <div className="text-center ">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 relative">
              ¿Es para vos?
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-20 h-1 rounded-full" style={{backgroundColor: '#56818F'}}></div>
            </h1>
            <div className="max-w-5xl mx-auto">
              <div className="grid md:grid-cols-2 gap-8 mb-12">
                <div className="space-y-6">
                  <div className="card-stagger flex items-start space-x-4 p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4" style={{borderLeftColor: '#56818F'}}>
                    <div className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center" style={{backgroundColor: '#56818F'}}>
                      <i className="fas fa-check text-white text-lg"></i>
                    </div>
                    <p className="text-lg text-gray-800 font-medium">
                      <strong>Querés salir a trabajar ya con una guía clara.</strong>
                    </p>
                  </div>
                  <div className="flex items-start space-x-4 p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4" style={{borderLeftColor: '#56818F'}}>
                    <div className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center" style={{backgroundColor: '#56818F'}}>
                      <i className="fas fa-check text-white text-lg"></i>
                    </div>
                    <p className="text-lg text-gray-800 font-medium">
                      <strong>Buscás criterio práctico y modelos listos para usar.</strong>
                    </p>
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4 p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4" style={{borderLeftColor: '#56818F'}}>
                    <div className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center" style={{backgroundColor: '#56818F'}}>
                      <i className="fas fa-check text-white text-lg"></i>
                    </div>
                    <p className="text-lg text-gray-800 font-medium">
                      <strong>Valorás el acompañamiento cercano en tus primeros expedientes.</strong>
                    </p>
                  </div>
                  <div className="flex items-start space-x-4 p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4" style={{borderLeftColor: '#56818F'}}>
                    <div className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center" style={{backgroundColor: '#56818F'}}>
                      <i className="fas fa-check text-white text-lg"></i>
                    </div>
                    <p className="text-lg text-gray-800 font-medium">
                      <strong>Te interesa abrir o fortalecer tu estudio con un método concreto.</strong>
                    </p>
                  </div>
                </div>
              </div>
              <div className="text-center">
                <button className="btn-primary btn-animate px-12 py-5 text-xl font-bold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                  <i className="fas fa-hand-point-right mr-3"></i>
                  Sí, es para mí
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What you get Section */}
      <section id="what-you-get" className={`py-16 relative overflow-hidden section-fade-in ${visibleSections.has('what-you-get') ? 'visible' : ''}`} style={{backgroundColor: '#56818F'}}>
        <div className="container mx-auto px-6">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-8 relative">
              Lo que te llevás (y empezás a usar ya)
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-20 h-1 rounded-full bg-white"></div>
            </h1>
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                <div className="flex items-start space-x-4 p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 bg-white bg-opacity-10 backdrop-blur-sm border border-white border-opacity-20">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center bg-white bg-opacity-20">
                    <i className="fas fa-video text-white text-lg"></i>
                  </div>
                  <p className="text-lg text-white font-medium">
                    <strong>Clases en vivo todos los miércoles a las 18 hs.</strong>
                  </p>
                </div>
                <div className="flex items-start space-x-4 p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 bg-white bg-opacity-10 backdrop-blur-sm border border-white border-opacity-20">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center bg-white bg-opacity-20">
                    <i className="fas fa-hands-helping text-white text-lg"></i>
                  </div>
                  <p className="text-lg text-white font-medium">
                    <strong>Acompañamiento directo en tus expedientes.</strong>
                  </p>
                </div>
                <div className="flex items-start space-x-4 p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 bg-white bg-opacity-10 backdrop-blur-sm border border-white border-opacity-20">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center bg-white bg-opacity-20">
                    <i className="fas fa-file-alt text-white text-lg"></i>
                  </div>
                  <p className="text-lg text-white font-medium">
                    <strong>Cientos de escritos y modelos de demandas reutilizables.</strong>
                  </p>
                </div>
                <div className="flex items-start space-x-4 p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 bg-white bg-opacity-10 backdrop-blur-sm border border-white border-opacity-20">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center bg-white bg-opacity-20">
                    <i className="fas fa-headset text-white text-lg"></i>
                  </div>
                  <p className="text-lg text-white font-medium">
                    <strong>Soporte 365 días por celular y correo.</strong>
                  </p>
                </div>
                <div className="flex items-start space-x-4 p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 bg-white bg-opacity-10 backdrop-blur-sm border border-white border-opacity-20">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center bg-white bg-opacity-20">
                    <i className="fab fa-whatsapp text-white text-lg"></i>
                  </div>
                  <p className="text-lg text-white font-medium">
                    <strong>Grupo privado de WhatsApp + comunidad activa.</strong>
                  </p>
                </div>
                <div className="flex items-start space-x-4 p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 bg-white bg-opacity-10 backdrop-blur-sm border border-white border-opacity-20">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center bg-white bg-opacity-20">
                    <i className="fas fa-brain text-white text-lg"></i>
                  </div>
                  <p className="text-lg text-white font-medium">
                    <strong>Resúmenes inteligentes de cada clase.</strong>
                  </p>
                </div>
              </div>
              <div className="text-center">
                <button className="btn-primary px-12 py-5 text-xl font-bold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 bg-white text-gray-800 hover:bg-gray-100">
                  <i className="fas fa-gift mr-3"></i>
                  Quiero estos beneficios
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What you will master Section */}
      <section id="what-you-master" className={`py-16 bg-white relative overflow-hidden section-fade-in ${visibleSections.has('what-you-master') ? 'visible' : ''}`}>
        <div className="container mx-auto px-6">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 relative">
              ¿Qué vas a dominar? (práctica real, aplicable hoy)
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-20 h-1 rounded-full" style={{backgroundColor: '#56818F'}}></div>
            </h1>
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                <div className="bg-white rounded-lg p-6 border border-gray-200 h-48 flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{backgroundColor: '#56818F'}}>
                      <i className="fas fa-pen-fancy text-white text-lg"></i>
                    </div>
                    <div className="w-2 h-2 rounded-full" style={{backgroundColor: '#56818F'}}></div>
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-lg font-bold text-gray-800 mb-2">Redacción de demandas</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Todo tipo de escritos judiciales con metodología probada.
                    </p>
                  </div>
                </div>
                
                <div className="rounded-lg p-6 border border-transparent h-48 flex flex-col justify-between" style={{backgroundColor: '#293949'}}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-white">
                      <i className="fas fa-file-contract text-lg" style={{color: '#56818F'}}></i>
                    </div>
                    <div className="w-2 h-2 rounded-full bg-white"></div>
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-lg font-bold text-white mb-2">Producción de prueba</h3>
                    <p className="text-white text-opacity-80 text-sm leading-relaxed">
                      Cédulas y oficios con criterio profesional.
                    </p>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg p-6 border border-gray-200 h-48 flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{backgroundColor: '#56818F'}}>
                      <i className="fas fa-envelope-open-text text-white text-lg"></i>
                    </div>
                    <div className="w-2 h-2 rounded-full" style={{backgroundColor: '#56818F'}}></div>
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-lg font-bold text-gray-800 mb-2">Notificaciones</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Dar y contestar traslados correctamente.
                    </p>
                  </div>
                </div>
                
                <div className="rounded-lg p-6 border border-transparent h-48 flex flex-col justify-between" style={{backgroundColor: '#56818F'}}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-white">
                      <i className="fas fa-gavel text-lg" style={{color: '#56818F'}}></i>
                    </div>
                    <div className="w-2 h-2 rounded-full bg-white"></div>
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-lg font-bold text-white mb-2">Audiencias</h3>
                    <p className="text-white text-opacity-80 text-sm leading-relaxed">
                      Juicios y debates orales frente al juez.
                    </p>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg p-6 border border-gray-200 h-48 flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{backgroundColor: '#293949'}}>
                      <i className="fas fa-chess text-white text-lg"></i>
                    </div>
                    <div className="w-2 h-2 rounded-full" style={{backgroundColor: '#293949'}}></div>
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-lg font-bold text-gray-800 mb-2">Tácticas</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Alegar, pedir sentencia, apelar y ejecutar.
                    </p>
                  </div>
                </div>
                
                <div className="rounded-lg p-6 border border-transparent h-48 flex flex-col justify-between" style={{backgroundColor: '#293949'}}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{backgroundColor: '#56818F'}}>
                      <i className="fas fa-theater-masks text-white text-lg"></i>
                    </div>
                    <div className="w-2 h-2 rounded-full" style={{backgroundColor: '#56818F'}}></div>
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-lg font-bold text-white mb-2">Simulaciones</h3>
                    <p className="text-white text-opacity-80 text-sm leading-relaxed">
                      Entrenar en escenarios reales.
                    </p>
                  </div>
                </div>
              </div>
              <div className="text-center">
                <button onClick={() => scrollToSection('subscription')} className="btn-primary px-12 py-5 text-xl font-bold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                  <i className="fas fa-graduation-cap mr-3"></i>
                  Aprender ahora
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5 in 1 Section */}
      <section id="five-in-one" className={`py-16 section-fade-in ${visibleSections.has('five-in-one') ? 'visible' : ''}`} style={{backgroundColor: '#293949'}}>
        <div className="container mx-auto px-6">
          <div className="text-center ">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-8">
              5 en 1: un solo curso, cinco áreas clave
            </h1>
            <div className="max-w-4xl mx-auto">
              <div className="relative">
                <div className="overflow-hidden">
                  <div className="flex transition-transform duration-500 ease-in-out" style={{transform: `translateX(-${currentArea * 100}%)`}}>
                    {[
                      {
                        title: "Civil",
                        description: "(accidentes de tránsito): demandas, pericias, acuerdos, ejecución."
                      },
                      {
                        title: "Laboral", 
                        description: "telegramas, demandas, audiencias (SECLO), cálculos e indemnizaciones."
                      },
                      {
                        title: "Penal",
                        description: "denuncias, querellas, estrategias de defensa, audiencias y medidas."
                      },
                      {
                        title: "Familia",
                        description: "alimentos, cuidado personal, comunicación, medidas urgentes."
                      },
                      {
                        title: "Sucesiones",
                        description: "inicio, declaratoria, administración, partición."
                      }
                    ].map((area, index) => (
                      <div key={index} className="w-full flex-shrink-0 px-4">
                        <div className="text-center">
                          <div className="relative mb-6">
                            <div className="w-32 h-32 rounded-full mx-auto flex items-center justify-center" style={{backgroundColor: '#56818F'}}>
                              <i className="fas fa-gavel text-white text-4xl"></i>
                            </div>
                          </div>
                          <div className="bg-white rounded-lg p-6 -mt-16 pt-20 shadow-lg h-48 flex flex-col justify-between">
                            <h5 className="text-xl font-semibold mb-4" style={{color: '#56818F'}}>{area.title}</h5>
                            <p className="text-gray-600 mb-4 flex-grow">{area.description}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Navigation buttons */}
                <button 
                  onClick={() => setCurrentArea((prev) => prev === 0 ? 4 : prev - 1)}
                  className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 text-white w-12 h-12 rounded-full flex items-center justify-center transition-colors z-10"
                  style={{backgroundColor: '#56818F', top: 'calc(50% + 2rem)'}}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#293949'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = '#56818F'}
                >
                  <i className="fas fa-chevron-left"></i>
                </button>
                <button 
                  onClick={() => setCurrentArea((prev) => (prev + 1) % 5)}
                  className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 text-white w-12 h-12 rounded-full flex items-center justify-center transition-colors z-10"
                  style={{backgroundColor: '#56818F', top: 'calc(50% + 2rem)'}}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#293949'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = '#56818F'}
                >
                  <i className="fas fa-chevron-right"></i>
                </button>
              </div>
              
              {/* Dots indicator */}
              <div className="flex justify-center space-x-2 mt-8">
                {[0, 1, 2, 3, 4].map((index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentArea(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index === currentArea ? 'bg-gray-800' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
              
              <button className="btn-primary px-8 py-4 text-lg font-semibold rounded-lg mt-8">
                Quiero formarme en las 5
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* How we do it Section */}
      <section id="how-we-do-it" className={`py-16 bg-white section-fade-in ${visibleSections.has('how-we-do-it') ? 'visible' : ''}`}>
        <div className="container mx-auto px-6">
          <div className="text-center ">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 relative">
              Cómo lo hacemos
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-20 h-1 rounded-full" style={{backgroundColor: '#56818F'}}></div>
            </h1>
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {[
                  {
                    icon: "fas fa-clock",
                    title: "Miércoles 18 hs",
                    description: "En vivo, con casos reales.",
                    image: "https://media.gq.com.mx/photos/63ed0e1e1413263c630bc0d6/16:9/w_2560%2Cc_limit/relojes-para-hombre-en-tendencia-2023-con-look-profesional.jpg"
                  },
                  {
                    icon: "fas fa-play-circle", 
                    title: "Simulaciones",
                    description: "Procesales para fijar el método.",
                    image: "https://cercademi.net/wp-content/uploads/2022/09/abogados-cerca-de-mi-1024x576.jpg"
                  },
                  {
                    icon: "fas fa-file-alt",
                    title: "Modelos y plantillas", 
                    description: "Para acelerar tu trabajo.",
                    image: "https://enews.mx/foto/noticias/noticias_20180528183254_1059.jpg"
                  },
                  {
                    icon: "fas fa-headset",
                    title: "Acompañamiento",
                    description: "Personalizado por celular y correo todo el año.",
                    image: "https://i0.wp.com/lcrnoticias.com/wp-content/uploads/2023/02/image-154.png?resize=805%2C499&ssl=1"
                  },
                  {
                    icon: "fas fa-brain",
                    title: "Resúmenes inteligentes",
                    description: "Para estudiar mejor y más rápido.",
                    image: "https://cancun.anahuac.mx/hs-fs/hubfs/reciben-premio-ceneval-al-desempeno-de-excelencia-alumnos-universidad-anahuac-cancun.jpg?width=1056&name=reciben-premio-ceneval-al-desempeno-de-excelencia-alumnos-universidad-anahuac-cancun.jpg"
                  }
                ].map((item, index) => (
                  <div key={index} className="text-center">
                    <div className="relative mb-6">
                      <img 
                        src={item.image} 
                        alt={item.title}
                        className="w-32 h-32 rounded-full mx-auto object-cover grayscale"
                      />
                    </div>
                    <div className="bg-gray-50 rounded-lg p-6 -mt-16 pt-20">
                      <h5 className="text-xl font-semibold mb-4">{item.title}</h5>
                      <p className="text-gray-600 mb-4">{item.description}</p>
                      <a href="#" className="border-b transition-colors" style={{color: '#56818F', borderColor: '#56818F'}} onMouseEnter={(e) => e.target.style.color = '#293949'} onMouseLeave={(e) => e.target.style.color = '#56818F'}>
                        Ver más
                      </a>
                    </div>
                  </div>
                ))}
              </div>
              <div className="text-center">
                <button className="btn-primary px-12 py-5 text-xl font-bold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                  <i className="fas fa-cogs mr-3"></i>
                  Quiero esta metodología
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section id="results" className={`py-16 section-fade-in ${visibleSections.has('results') ? 'visible' : ''}`} style={{backgroundColor: '#56818F'}}>
        <div className="container mx-auto px-6">
          <div className="text-center ">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-8 relative">
              Resultados que importan
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-20 h-1 rounded-full bg-white"></div>
            </h1>
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                {[
                  { 
                    name: "Trabajar desde el día uno", 
                    description: "Como abogado desde el primer día",
                    price: "Día 1",
                    icon: (
                      <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                      </svg>
                    )
                  },
                  { 
                    name: "Confianza en audiencias", 
                    description: "Con método y claridad",
                    price: "100%",
                    icon: (
                      <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
                      </svg>
                    )
                  },
                  { 
                    name: "Tu propio estudio", 
                    description: "Listo para el área que elijas",
                    price: "Listo",
                    icon: (
                      <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                    )
                  },
                  { 
                    name: "Red profesional", 
                    description: "Con amplia trayectoria",
                    price: "20+ años",
                    icon: (
                      <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                      </svg>
                    )
                  }
                ].map((result, index) => (
                  <div key={index} className="bg-white rounded-lg p-6 text-center relative">
                    <div className="text-white px-4 py-2 rounded-lg absolute -top-4 left-1/2 transform -translate-x-1/2" style={{backgroundColor: '#293949'}}>
                      <h4 className="font-bold">{result.price}</h4>
                    </div>
                    <div className="rounded-full w-32 h-32 mx-auto mb-6 p-4 relative -mt-8 flex items-center justify-center" style={{backgroundColor: '#293949'}}>
                      {result.icon}
                    </div>
                    <h5 className="text-xl font-bold mb-4">{result.name}</h5>
                    <p className="text-gray-600 mb-4">{result.description}</p>
                    <button className="btn-secondary px-6 py-2 rounded-lg">
                      Ver más
                    </button>
                  </div>
                ))}
              </div>
              <div className="text-center">
                <button className="btn-primary px-12 py-5 text-xl font-bold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 bg-white text-gray-800 hover:bg-gray-100">
                  <i className="fas fa-rocket mr-3"></i>
                  Empezar hoy
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modality Section */}
      <section id="modality" className={`py-16 bg-white section-fade-in ${visibleSections.has('modality') ? 'visible' : ''}`}>
        <div className="container mx-auto px-6">
          <div className="text-center ">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 relative">
              Modalidad y acceso
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-20 h-1 rounded-full" style={{backgroundColor: '#56818F'}}></div>
            </h1>
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                {[
                  {
                    icon: "fas fa-laptop",
                    title: "100% online",
                    description: "Acceso desde cualquier lugar"
                  },
                  {
                    icon: "fas fa-clock",
                    title: "Miércoles 18 hs", 
                    description: "En vivo cada semana"
                  },
                  {
                    icon: "fas fa-video",
                    title: "Grabaciones",
                    description: "Y materiales permanentes"
                  },
                  {
                    icon: "fas fa-users",
                    title: "Comunidad privada",
                    description: "Para consultas y networking"
                  }
                ].map((item, index) => (
                  <div key={index} className="text-center p-8 rounded-lg hover:shadow-lg transition-all duration-300" style={{backgroundColor: index % 2 === 0 ? '#f8f9fa' : '#e9ecef'}}>
                    <div className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center" style={{backgroundColor: '#56818F'}}>
                      <i className={`${item.icon} text-white text-2xl`}></i>
                    </div>
                    <h3 className="text-xl font-bold mb-4" style={{color: '#293949'}}>{item.title}</h3>
                    <p className="text-gray-600 mb-6">{item.description}</p>
                    <button className="px-6 py-2 rounded-lg text-sm font-semibold transition-colors" style={{backgroundColor: '#56818F', color: 'white'}} onMouseEnter={(e) => e.target.style.backgroundColor = '#293949'} onMouseLeave={(e) => e.target.style.backgroundColor = '#56818F'}>
                      Más info
                    </button>
                  </div>
                ))}
              </div>
              <div className="text-center">
                <button onClick={() => scrollToSection('subscription')} className="btn-primary px-12 py-5 text-xl font-bold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                  <i className="fas fa-calendar-check mr-3"></i>
                  Reservar cupo
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What's included Section */}
      <section id="whats-included" className={`py-16 section-fade-in ${visibleSections.has('whats-included') ? 'visible' : ''}`} style={{backgroundColor: '#293949'}}>
        <div className="container mx-auto px-6">
          <div className="text-center ">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-8 relative">
              Todo lo que incluye
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-20 h-1 rounded-full bg-white"></div>
            </h1>
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                {[
                  {
                    title: "Biblioteca completa",
                    description: "Cientos de escritos y modelos de demandas.",
                    image: "https://img.travesiasdigital.com/2022/05/01-interna-bibliotecas-mexico.jpeg"
                  },
                  {
                    title: "Checklists y guías", 
                    description: "Plantillas operativas listas.",
                    image: "https://volemos.nyc3.digitaloceanspaces.com/blog/wp-content/uploads/2018/10/Checklist_portada.jpg"
                  },
                  {
                    title: "Video-clases",
                    description: "Y resúmenes de cada encuentro.",
                    image: "https://es.vidnoz.com/bimg/introduccion-a-los-video-clases.webp"
                  },
                  {
                    title: "Acompañamiento 365",
                    description: "En tus casos reales.",
                    image: "https://mujeresmas.com.mx/wp-content/uploads/2021/01/asesoria_juridica.jpg"
                  }
                ].map((item, index) => (
                  <div key={index} className="text-center">
                    <div className="relative mb-6">
                      <img 
                        src={item.image} 
                        alt={item.title}
                        className="w-32 h-32 rounded-full mx-auto object-cover grayscale"
                      />
                    </div>
                    <div className="bg-white rounded-lg p-6 -mt-16 pt-20 h-48 flex flex-col justify-center">
                      <h5 className="text-xl font-semibold mb-4">{item.title}</h5>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="text-center">
                <button onClick={() => scrollToSection('subscription')} className="btn-primary px-12 py-5 text-xl font-bold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 bg-white text-gray-800 hover:bg-gray-100">
                  <i className="fas fa-unlock mr-3"></i>
                  Acceder ahora
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Who accompanies you Section */}
      <section id="who-accompanies" className={`py-16 bg-white section-fade-in ${visibleSections.has('who-accompanies') ? 'visible' : ''}`}>
        <div className="container mx-auto px-6">
          <div className="text-center ">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
              Quién te acompaña
            </h1>
            <div className="max-w-4xl mx-auto">
              <p className="text-lg text-gray-700 mb-8">
                El Dr. Tucci y el equipo de La Escuelita del Abogado forman colegas en ejercicio real, con más de 20 años de experiencia combinada.
              </p>
              <p className="text-lg text-gray-700 mb-12">
                Nuestra misión: que trabajes ya, con criterio práctico, seguridad profesional y resultados concretos.
              </p>
              <button onClick={() => scrollToSection('subscription')} className="btn-primary px-8 py-4 text-lg font-semibold rounded-lg">
                Aprender con el Dr. Tucci
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className={`py-16 section-fade-in ${visibleSections.has('faq') ? 'visible' : ''}`} style={{backgroundColor: '#56818F'}}>
        <div className="container mx-auto px-6">
          <div className="text-center ">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-8">
              Preguntas frecuentes
            </h1>
            <div className="max-w-4xl mx-auto">
              <div className="space-y-6 mb-12">
                <div className="bg-white p-6 rounded-lg shadow-lg text-left">
                  <p className="text-lg font-semibold mb-2">¿Necesito experiencia previa?</p>
                  <p className="text-gray-700">No: empezás a litigar desde el día uno con guía y materiales listos.</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-lg text-left">
                  <p className="text-lg font-semibold mb-2">¿Y si no puedo asistir en vivo?</p>
                  <p className="text-gray-700">Accedés a grabaciones y resúmenes de cada clase.</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-lg text-left">
                  <p className="text-lg font-semibold mb-2">¿Cómo hago consultas?</p>
                  <p className="text-gray-700">Por WhatsApp y correo, todo el año.</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-lg text-left">
                  <p className="text-lg font-semibold mb-2">¿Incluye modelos?</p>
                  <p className="text-gray-700">Sí, cientos para copiar, adaptar y presentar.</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-lg text-left">
                  <p className="text-lg font-semibold mb-2">¿Sirve para ejercer por mi cuenta?</p>
                  <p className="text-gray-700">Te acompañamos hasta tu primera causa real (y las que siguen).</p>
                </div>
              </div>
              <button className="btn-primary px-8 py-4 text-lg font-semibold rounded-lg">
                Aclarar una duda
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className={`py-16 bg-white section-fade-in ${visibleSections.has('contact') ? 'visible' : ''}`}>
        <div className="container mx-auto px-6">
          <div className="text-center ">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
              Contacto directo
            </h1>
            <div className="max-w-4xl mx-auto">
              <div className="space-y-4 mb-12">
                <p className="text-lg text-gray-700">
                  <strong>WhatsApp / Celular:</strong> +54 9 11 5858-8382
                </p>
                <p className="text-lg text-gray-700">
                  <strong>Correo:</strong> asistentetucci@gmail.com
                </p>
                <p className="text-lg text-gray-700">
                  <strong>Más info:</strong> TikTok @la.escuelita.del.abogado
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="btn-primary px-8 py-4 text-lg font-semibold rounded-lg">
                  Escribir por WhatsApp
                </button>
                <button className="btn-secondary px-8 py-4 text-lg font-semibold rounded-lg">
                  Reservar mi lugar
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Closing Section */}
      <section id="closing" className={`py-16 section-fade-in ${visibleSections.has('closing') ? 'visible' : ''}`} style={{backgroundColor: '#293949'}}>
        <div className="container mx-auto px-6">
          <div className="text-center ">
           
            <div className="max-w-4xl mx-auto">
              <p className="text-lg text-white mb-12">
                Inscribite hoy y empezá a litigar con un método probado. Sumá práctica, criterio y una comunidad que potencia tu crecimiento desde el primer día.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button onClick={() => scrollToSection('subscription')} className="btn-primary px-8 py-4 text-lg font-semibold rounded-lg">
                  Inscribirme ahora
                </button>
                <button className="btn-secondary px-8 py-4 text-lg font-semibold rounded-lg">
                  Hablar por WhatsApp
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Subscription Section */}
      <section id="subscription" className={`py-16 section-fade-in ${visibleSections.has('subscription') ? 'visible' : ''}`} style={{backgroundColor: '#56818F'}}>
        <div className="container mx-auto px-6">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-8 relative">
              Inscripción al Curso
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-20 h-1 rounded-full bg-white"></div>
            </h1>
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-2xl p-8 md:p-12 shadow-2xl">
                <h2 className="text-2xl md:text-3xl font-bold mb-6" style={{color: '#293949'}}>
                  ¡Reservá tu lugar ahora!
                </h2>
                <p className="text-lg mb-8 max-w-2xl mx-auto" style={{color: '#293949'}}>
                  Accedé al entrenamiento práctico 5 en 1 del Dr. Tucci. Clases en vivo, modelos listos, simulaciones y soporte 365 días.
                </p>
                
                {/* MercadoPago Button */}
                <div className="mb-8">
                  <a 
                    href="https://www.mercadopago.com.ar/subscriptions/checkout?preapproval_plan_id=e9b8e341bee743d0872bb829afa510ff" 
                    name="MP-payButton" 
                    className="inline-flex items-center px-8 py-4 text-white font-bold rounded-lg text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                    style={{
                      backgroundColor: '#56818F',
                      color: 'white',
                      textDecoration: 'none',
                      fontFamily: 'Poppins, sans-serif'
                    }}
                    onMouseEnter={(e) => e.target.style.backgroundColor = '#293949'}
                    onMouseLeave={(e) => e.target.style.backgroundColor = '#56818F'}
                  >
                    <i className="fas fa-credit-card mr-3"></i>
                    Suscribirme al Curso
                  </a>
                </div>

                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <div className="text-center p-6 rounded-xl" style={{backgroundColor: '#f8f9fa'}}>
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{backgroundColor: '#56818F'}}>
                      <i className="fas fa-shield-alt text-white text-2xl"></i>
                    </div>
                    <h3 className="font-bold mb-2" style={{color: '#293949'}}>Pago Seguro</h3>
                    <p className="text-sm" style={{color: '#293949'}}>Protegido por MercadoPago</p>
                  </div>
                  <div className="text-center p-6 rounded-xl" style={{backgroundColor: '#f8f9fa'}}>
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{backgroundColor: '#56818F'}}>
                      <i className="fas fa-clock text-white text-2xl"></i>
                    </div>
                    <h3 className="font-bold mb-2" style={{color: '#293949'}}>Acceso Inmediato</h3>
                    <p className="text-sm" style={{color: '#293949'}}>Empieza hoy mismo</p>
                  </div>
                  <div className="text-center p-6 rounded-xl" style={{backgroundColor: '#f8f9fa'}}>
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{backgroundColor: '#56818F'}}>
                      <i className="fas fa-headset text-white text-2xl"></i>
                    </div>
                    <h3 className="font-bold mb-2" style={{color: '#293949'}}>Soporte 365</h3>
                    <p className="text-sm" style={{color: '#293949'}}>Acompañamiento completo</p>
                  </div>
                </div>

                <div className="text-center">
                  <p className="text-sm mb-4" style={{color: '#293949'}}>
                    ¿Tenés dudas? Contactanos por WhatsApp
                  </p>
                  <a 
                    href="https://wa.me/5491158588382" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-6 py-3 text-white font-semibold rounded-lg transition-colors"
                    style={{backgroundColor: '#25D366'}}
                    onMouseEnter={(e) => e.target.style.backgroundColor = '#128C7E'}
                    onMouseLeave={(e) => e.target.style.backgroundColor = '#25D366'}
                  >
                    <i className="fab fa-whatsapp mr-2"></i>
                    +54 9 11 5858-8382
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 py-12">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <div className="mb-8">
              <div className="text-4xl font-bold mb-4">
                <span style={{color: '#56818F'}}>Dr.</span>
                <span style={{color: '#293949'}}>Tucci</span>
              </div>
            </div>
            <div className="flex justify-center space-x-6 mb-8">
              <a href="https://tiktok.com/@la.escuelita.del.abogado" target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-gray-200 rounded-lg flex items-center space-x-2 transition-colors" onMouseEnter={(e) => {e.target.style.backgroundColor = '#56818F'; e.target.style.color = 'white'}} onMouseLeave={(e) => {e.target.style.backgroundColor = '#f3f4f6'; e.target.style.color = 'inherit'}}>
                <i className="fab fa-tiktok"></i>
                <span className="text-sm">@la.escuelita.del.abogado</span>
              </a>
              <a href="https://wa.me/5491158588382" target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-gray-200 rounded-lg flex items-center space-x-2 transition-colors" onMouseEnter={(e) => {e.target.style.backgroundColor = '#56818F'; e.target.style.color = 'white'}} onMouseLeave={(e) => {e.target.style.backgroundColor = '#f3f4f6'; e.target.style.color = 'inherit'}}>
                <i className="fab fa-whatsapp"></i>
                <span className="text-sm">+54 9 11 5858-8382</span>
              </a>
            </div>
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div>
                <h5 className="font-bold mb-4">Contacto directo</h5>
                <p className="mb-2"><strong>WhatsApp / Celular:</strong> +54 9 11 5858-8382</p>
                <p className="mb-2"><strong>Correo:</strong> asistentetucci@gmail.com</p>
                <p><strong>Más info:</strong> TikTok @la.escuelita.del.abogado</p>
              </div>
              <div>
                <h5 className="font-bold mb-4">Quién te acompaña</h5>
                <p className="mb-2">El Dr. Tucci y el equipo de La Escuelita del Abogado forman colegas en ejercicio real, con más de 20 años de experiencia combinada.</p>
                <p>Nuestra misión: que trabajes ya, con criterio práctico, seguridad profesional y resultados concretos.</p>
              </div>
            </div>
            <div className="border-t border-gray-300 pt-8">
              <p className="text-gray-600">
                &copy; 2024 Dr. Tucci - La Escuelita del Abogado. Todos los derechos reservados.
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* WhatsApp Floating Button */}
      <a 
        href="https://wa.me/5491158588382" 
        target="_blank" 
        rel="noopener noreferrer"
        className={`fixed bottom-4 right-4 md:bottom-6 md:right-6 text-white w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center transition-all duration-300 z-[60] shadow-lg hover:shadow-xl transform hover:scale-110 ${isPageLoaded ? 'opacity-100' : 'opacity-0'}`}
        style={{backgroundColor: '#25D366'}}
        onMouseEnter={(e) => e.target.style.backgroundColor = '#128C7E'}
        onMouseLeave={(e) => e.target.style.backgroundColor = '#25D366'}
      >
        <i className="fab fa-whatsapp text-lg md:text-2xl"></i>
      </a>

      {/* Back to Top Button */}
      <button 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`fixed bottom-4 right-20 md:bottom-6 md:right-24 text-white w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-colors z-[50] btn-animate ${isPageLoaded ? 'opacity-100' : 'opacity-0'}`}
        style={{backgroundColor: '#56818F'}}
        onMouseEnter={(e) => e.target.style.backgroundColor = '#293949'}
        onMouseLeave={(e) => e.target.style.backgroundColor = '#56818F'}
      >
        <i className="fas fa-angle-double-up text-sm md:text-base"></i>
      </button>

      {/* MercadoPago Script */}
      <script type="text/javascript" dangerouslySetInnerHTML={{
        __html: `
          (function() {
            function $MPC_load() {
              window.$MPC_loaded !== true && (function() {
                var s = document.createElement("script");
                s.type = "text/javascript";
                s.async = true;
                s.src = document.location.protocol + "//secure.mlstatic.com/mptools/render.js";
                var x = document.getElementsByTagName('script')[0];
                x.parentNode.insertBefore(s, x);
                window.$MPC_loaded = true;
              })();
            }
            window.$MPC_loaded !== true ? (window.attachEvent ? window.attachEvent('onload', $MPC_load) : window.addEventListener('load', $MPC_load, false)) : null;
          })();
        `
      }} />

    </div>
  )
}

export default App
