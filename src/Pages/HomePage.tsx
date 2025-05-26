import { useTheme } from "../hooks/useTheme";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import Loader from "../Components/Loader";
import NavbarTop from "../Components/Navbar/NavbarTop";
import { Carousel } from "../Components/Carousel";
import NavbarBottom from "../Components/Navbar/NavbarBottom";
import { NavigationProvider } from "../contexts/NavigationContext";

const HomePage = () => {
  const { isDarkMode, colors } = useTheme();

  return (
    <NavigationProvider>
      <section
        className="h-screen w-full overflow-hidden transition-colors duration-300"
        style={{
          backgroundColor: isDarkMode ? colors.background : colors.primary,
        }}
        data-cy="home-section"
      >
        <div className="grid grid-rows-[min-content_1fr_min-content] h-full">
          {/* NavbarTop */}
          <div className="w-full">
            <NavbarTop />
          </div>

          {/* Canvas - Contient le Carousel 3D */}
          <div className="w-full h-full overflow-hidden">
            <Canvas
              className="w-full h-full"
              camera={{ position: [0, 0, 5], near: 0.1, far: 1000, fov: 75 }}
            >
              <Suspense fallback={<Loader />}>
                <directionalLight position={[0, 5, 5]} intensity={2} />
                <ambientLight intensity={1} />
                <hemisphereLight groundColor="#b9d5ff" intensity={1} />
                <Carousel radius={2} />
              </Suspense>
            </Canvas>
          </div>

          {/* --- Section de contenu textuel OPTIMISÉE pour le SEO --- */}
          <div className="sr-only-seo-content">
            <h1>
              Phenixio Studio : Développement Web Full-Stack & Applications
              Mobiles sur Mesure par Sylvain DE LUCA
            </h1>

            {/* SECTION À PROPOS */}
            <section id="about-seo">
              <h2>
                À Propos de Phenixio Studio : Votre partenaire pour une présence
                web et mobile qui sort du lot
              </h2>
              <p>
                Je ne fais pas comme tout le monde. Je suis **DE LUCA Sylvain**,
                un **créateur de solutions numériques passionné** qui transforme
                vos idées en réalités concrètes, que ce soit sur le **web** ou
                sur **mobile**. Avec moi, attendez-vous à une approche moderne,
                originale et créative, et à des **solutions sur mesure** qui
                répondent précisément à vos besoins.
              </p>
              <h3>
                Mon parcours : De la passion du jeu vidéo à la création web et
                mobile
              </h3>
              <p>
                Tout a commencé avec un besoin personnel et une forte envie de
                créer. Joueur passionné de Trading Card Games (comme Magic: The
                Gathering), je me suis heurté à la difficulté de tester
                efficacement mes stratégies de jeu. C'est de là qu'est née
                l'idée de concevoir une **application mobile** pour simuler des
                scénarios, une sorte d'algorithme de jeu de rôle.
              </p>
              <p>
                Partant de zéro en **développement**, je me suis lancé, guidé
                par la curiosité et l'envie de concrétiser cette idée. Après
                deux mois d'expérimentation et d'apprentissage autodidacte
                (notamment avec l'aide de ChatGPT), j'ai abouti à un prototype
                fonctionnel. La satisfaction de voir une idée prendre forme
                concrètement de mes propres mains, une sensation que je
                connaissais déjà avec le bricolage, m'a conforté : le
                **développement numérique** était fait pour moi.
              </p>
              <h3>Une formation d'excellence au service de vos projets</h3>
              <p>
                Cette expérience fondatrice m'a donné l'envie d'aller plus loin
                et d'acquérir des bases solides. J'ai alors intégré
                **Alt/Incubateur Tech**, attiré par leur approche immersive.
                Travailler en conditions réelles d'entreprise, aux côtés de
                **développeurs expérimentés** et d'un **architecte applicatif**,
                correspondait parfaitement à ma vision de l'apprentissage. C'est
                là que j'ai pu approfondir mes compétences et affiner ma
                méthodologie.
              </p>
              <p>
                J'ai été formé aux technologies **React**, **Node.js**,
                **TypeScript** et **MySQL**, des outils reconnus pour le
                **développement web** et la force de leur communauté. Pour le
                **développement mobile**, j'ai privilégié le framework
                **Flutter**, apprécié pour ses performances, son optimisation
                pour les développeurs et sa compatibilité **iOS** et
                **Android**.
              </p>
              <h3>Mon approche : Concevoir avec vous, pour vous</h3>
              <ul>
                <li>
                  **Écoute et co-création :** Comme avec mon application de jeu,
                  j'accorde une grande importance aux retours des utilisateurs
                  potentiels. Nous travaillerons ensemble sur l'interface et
                  l'expérience utilisateur pour que le résultat final, qu'il
                  s'agisse d'un **site web** ou d'une **application**, soit
                  parfaitement aligné avec vos attentes et celles de votre
                  audience.
                </li>
                <li>
                  **Gestion de projet rigoureuse :** J'anticipe les
                  améliorations futures, priorise les fonctionnalités, et fais
                  preuve d'adaptabilité. Le respect des délais et une
                  communication transparente sont au cœur de ma méthode.
                </li>
                <li>
                  **Solutions sur mesure :** On n'a pas besoin d'avoir LA bonne
                  idée pour se lancer, juste le besoin d'apporter sa touche
                  personnelle et ce petit truc en plus qui fera la différence.
                  Ensemble, on cherchera ce qui fonctionne déjà très bien, et je
                  vous aiderai à l'adapter à votre projet, avec votre touche
                  unique.
                </li>
              </ul>
              <h3>
                Mon engagement : L'innovation au service de votre singularité
              </h3>
              <p>
                Aujourd'hui, mon esprit de joueur et ma soif d'apprendre me
                poussent à explorer de nouveaux horizons. Je m'autoforme à
                l'**animation** et à la **modélisation 3D**, car je crois qu'il
                est essentiel de proposer des solutions qui sortent de
                l'ordinaire et exploitent tout le potentiel des outils actuels.
              </p>
              <p>
                Mon objectif est clair : vous proposer des **sites web** et
                **applications** non seulement fonctionnels, mais aussi
                mémorables et générateurs de croissance, qui marqueront les
                esprits et vous différencieront.
              </p>
              <p>
                Envie d'en savoir plus ? Je vous invite à parcourir mon
                portfolio pour découvrir mes réalisations. Si vous avez un
                projet en tête ou simplement des questions, n'hésitez pas à me
                contacter. Je serais ravi d'échanger avec vous.
              </p>
            </section>
            <section id="projects-seo">
              <h2>
                Mes Réalisations - Projets de Développement Web et Applications
                Mobiles
              </h2>
              <p>
                Découvrez mes projets récents, conçus pour offrir des
                expériences digitales uniques et performantes.
              </p>

              <h3>
                Projet de Formation : Eduka - Site de Gestion d'Événements
                Extra-Scolaires
              </h3>
              <p>
                Développement d'une **application web full-stack** nommée
                **Eduka**, dédiée à la **gestion d'événements extra-scolaires**.
                Ce projet met en œuvre mes compétences en **développement web
                complet** avec une architecture **front-end** et **back-end**
                robuste. Il inclut des fonctionnalités de **gestion des
                utilisateurs**, de **planification d'événements**, et
                d'**administration des activités**.
              </p>
              <p>
                Technologies clés : **React** (pour le front-end), **Node.js**
                avec **NestJS** (pour le back-end et les API), et **Prisma**
                (pour la gestion de la base de données **MySQL**). Ce projet
                démontre ma maîtrise des technologies **TypeScript** et ma
                capacité à construire des applications web complexes et
                scalable.
              </p>

              <h3>
                Application Mobile de Simulation de Jeu (Projet Personnel)
              </h3>
              <p>
                **Application mobile** innovante développée avec **Flutter**
                pour simuler des scénarios de jeux de cartes. Ce projet a été le
                point de départ de ma passion pour le **développement mobile**
                et le **développement d'algorithmes** complexes.
              </p>

              <h3>Site Web Vitrine Phenixio Studio (Projet Personnel)</h3>
              <p>
                Conception et développement de ce **site web vitrine** actuel,
                utilisant **React**, **TypeScript**, et **React Three Fiber**
                pour une expérience utilisateur interactive et immersive en 3D.
                Ce projet démontre mes compétences en **développement front-end
                moderne** et en **intégration d'animations web avancées**.
              </p>
            </section>

            <section id="contact-seo">
              <h2>Contactez Phenixio Studio - Pour Vos Projets Web & Mobile</h2>
              <p>
                Prêt à démarrer votre projet de développement web ou
                d'application mobile ? Contactez-moi dès aujourd'hui pour
                discuter de vos besoins et obtenir un devis personnalisé. Je
                suis disponible pour échanger sur vos idées et vous accompagner
                dans la création de votre solution digitale.
              </p>
              <p>
                Email :{" "}
                <a href="mailto:phenixio.studio@gmail.com">
                  phenixio.studio@gmail.com
                </a>{" "}
                <br />
              </p>
            </section>

            <section id="settings-seo">
              <h2>Paramètres du Site</h2>
              <p>
                Cette section permet d'ajuster les préférences d'affichage et
                l'accessibilité du site Phenixio Studio.
              </p>
            </section>
          </div>
          {/* --- Fin de la section de contenu textuel pour le SEO --- */}

          {/* NavbarBottom */}
          <div className="w-full">
            <NavbarBottom />
          </div>
        </div>
      </section>
    </NavigationProvider>
  );
};

export default HomePage;
