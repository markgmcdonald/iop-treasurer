/* ------------------------------------------------------------------
   IDEA WHEEL: edit, add, or delete cards here. Each card is one { ... } block.

   kind:    "continuing"  = long-term work carried on from past treasurers
            "new"         = new idea: starts now, builds toward long-term
   icon:    the small picture on the card. Pick one:
              coins, briefcase, chart, book, clipboard, seedling,
              chat, calendar, house, food, bulb
            (leave it out and the card gets "bulb")
   title:   card title. Put *stars* around a word to highlight it, e.g. "*Workable* budgets"
   blurb:   one sentence, plain language (the bold line)
   mine:    (continuing cards) what YOU would do with it
   now:     (new cards) what starts in the first weeks
   later:   (new cards) where it goes long-term
   detail:  (new cards) use this INSTEAD of now/later when you have one description
   why:     (optional, any card) one line on where the idea comes from; shows as a "Why" row
   accent:  (optional) "gold" turns the card gold, with a gold dot below the wheel, so it stands out
   baton:   (optional, continuing cards) credit the past treasurer, e.g.
            "Started under Jane Doe (Treasurer, 2024-25)". Leave "" to hide it.

   es / fr: (optional) the Spanish and French versions of the same card, using the same
            field names (title, blurb, mine, now, later, detail, why, baton).
            Any field you leave out simply shows in English. When you add a card, copy the
            es / fr blocks from a similar card and translate them.

   The wheel shows cards in the order listed here.

   TODO after your conversation with a past treasurer:
   add their long-term ideas as new "continuing" cards below, and fill in "baton".
------------------------------------------------------------------- */
window.IDEAS = [

  /* ---------- CARRYING FORWARD (long-term, from before me) ---------- */
  {
    kind: "continuing",
    icon: "coins",
    title: "OneFund",
    blurb: "Continue to expand opportunities and available resources through the OneFund.",
    mine: "Make sure it's available and that people know about it: a start-of-semester push for applicants, consistent reminders, and a quicker turnaround time.",
    baton: "",
    es: {
      title: "OneFund",
      blurb: "Seguir ampliando las oportunidades y los recursos disponibles a través del OneFund.",
      mine: "Asegurarme de que esté disponible y de que la gente lo conozca: un impulso al inicio del semestre para atraer solicitantes, recordatorios constantes y un tiempo de respuesta más rápido."
    },
    fr: {
      title: "OneFund",
      blurb: "Continuer d’élargir les opportunités et les ressources disponibles par le biais du OneFund.",
      mine: "Veiller à ce qu’il soit disponible et à ce que les gens le connaissent : une campagne en début de semestre pour attirer des candidats, des rappels réguliers et des délais de réponse plus courts."
    }
  },
  {
    kind: "continuing",
    icon: "briefcase",
    title: "Director's Internships",
    blurb: "Expand Director's Internships across various fields and different locations.",
    mine: "Work with the DICS and IOP Staff to add more placements across sectors of public service and in a wider variety of locations, in and around the major hubs.",
    baton: "",
    es: {
      title: "Director's Internships",
      blurb: "Ampliar las Director's Internships a diversos campos y a distintos lugares.",
      mine: "Trabajar con el DICS y el personal del IOP para sumar más plazas en distintos sectores del servicio público y en una mayor variedad de lugares, dentro y alrededor de los principales centros."
    },
    fr: {
      title: "Director's Internships",
      blurb: "Étendre les Director's Internships à des domaines variés et à différents lieux.",
      mine: "Travailler avec le DICS et le personnel de l’IOP pour ajouter davantage de places dans différents secteurs du service public et dans une plus grande variété de lieux, dans et autour des grands pôles."
    }
  },
  {
    kind: "continuing",
    icon: "chart",
    title: "*Workable* budgets for every program",
    blurb: "Keep working toward equitable budgets for all programs, coalitions, and other student-forward initiatives.",
    mine: "Build budgets that let every program host the events and sessions it needs to thrive, using the same budget-case work that won an 83% SAF increase.",
    baton: "",
    es: {
      title: "Presupuestos *viables* para cada programa",
      blurb: "Seguir trabajando por presupuestos equitativos para todos los programas, coaliciones y demás iniciativas que ponen a los estudiantes en primer lugar.",
      mine: "Construir presupuestos que permitan a cada programa organizar los eventos y sesiones que necesita para prosperar, recurriendo al mismo trabajo de argumentación presupuestaria que logró un aumento del 83% en las asignaciones de la Cuota de Actividades Estudiantiles."
    },
    fr: {
      title: "Des budgets *viables* pour chaque programme",
      blurb: "Continuer à œuvrer pour des budgets équitables pour tous les programmes, coalitions et autres initiatives qui placent les étudiants au premier plan.",
      mine: "Construire des budgets qui permettent à chaque programme d’organiser les événements et les séances dont il a besoin pour s’épanouir, en m’appuyant sur le même travail d’argumentaire budgétaire qui a permis une hausse de 83 % des allocations issues des frais d’activités étudiantes."
    }
  },
  {
    kind: "continuing",
    icon: "book",
    title: "The Funding Guide",
    blurb: "Keep explaining how funding is disbursed, as openly as I responsibly can.",
    mine: "Keep the guide current, explain decisions plainly, and say so when something can't be shared, while keeping the pragmatism that lets funding be applied for and stay abundant.",
    baton: "",
    es: {
      title: "La Guía de Financiamiento",
      blurb: "Seguir explicando cómo se distribuye el financiamiento, con la mayor apertura que pueda de manera responsable.",
      mine: "Mantener la guía al día, explicar las decisiones con claridad y decir abiertamente cuando algo no se pueda compartir, sin perder el pragmatismo que permite solicitar el financiamiento y que este siga siendo abundante."
    },
    fr: {
      title: "Le guide de financement",
      blurb: "Continuer d’expliquer comment les financements sont distribués, aussi ouvertement que je peux le faire de manière responsable.",
      mine: "Tenir le guide à jour, expliquer les décisions simplement et dire clairement quand quelque chose ne peut pas être partagé, tout en gardant le pragmatisme qui permet de demander des financements et de les maintenir abondants."
    }
  },

  /* ---------- NEW (start now, build for the long term) ---------- */
  {
    kind: "new",
    icon: "food",
    accent: "gold",
    title: "IOP food drops",
    blurb: "Monthly evening study breaks with food from local businesses and favorites.",
    why: "A favorite in housing communities that I want to expand to the IOP.",
    detail: "In conjunction with the broader SAC and the entire IOP community, a place for people across the public service community to come together, study, discuss, or relax.",
    es: {
      title: "Pausas con comida del IOP",
      blurb: "Pausas de estudio mensuales por la noche, con comida de negocios locales y de lugares favoritos.",
      why: "Un favorito en las comunidades residenciales que quiero extender al IOP.",
      detail: "En conjunto con el SAC en general y con toda la comunidad del IOP, un espacio para que personas de toda la comunidad de servicio público se reúnan, estudien, conversen o se relajen."
    },
    fr: {
      title: "Pauses gourmandes de l’IOP",
      blurb: "Des pauses d’étude mensuelles en soirée, avec de la nourriture de commerces locaux et d’adresses favorites.",
      why: "Un grand favori dans les communautés résidentielles, que je veux étendre à l’IOP.",
      detail: "En collaboration avec le SAC dans son ensemble et toute la communauté de l’IOP, un lieu où les membres de la communauté du service public peuvent se retrouver, étudier, discuter ou se détendre."
    }
  },
  {
    kind: "new",
    icon: "clipboard",
    title: "Ask-first priorities survey",
    blurb: "Before I set priorities, I ask you.",
    now: "A short survey in my first weeks. Your messages on this page are the start.",
    later: "Repeat it every term so the budget follows what the community wants.",
    es: {
      title: "Encuesta de prioridades: preguntar primero",
      blurb: "Antes de fijar prioridades, te pregunto a ti.",
      now: "Una encuesta breve en mis primeras semanas. Tus mensajes en esta página son el comienzo.",
      later: "Repetirla cada semestre para que el presupuesto siga lo que quiere la comunidad."
    },
    fr: {
      title: "Sondage sur les priorités : demander d’abord",
      blurb: "Avant de fixer des priorités, c’est à vous que je pose la question.",
      now: "Un court sondage dès mes premières semaines. Vos messages sur cette page en sont le point de départ.",
      later: "Le répéter chaque semestre pour que le budget suive ce que veut la communauté."
    }
  },
  {
    kind: "new",
    icon: "chat",
    title: "1-on-1s and open Q&As",
    blurb: "Budget questions answered in person and in public, consistently.",
    now: "Set a regular schedule right away.",
    later: "Setting a precedent for a standing rhythm so that access doesn't depend on who holds the job.",
    es: {
      title: "Reuniones individuales y sesiones abiertas de preguntas",
      blurb: "Preguntas sobre el presupuesto respondidas en persona y en público, con constancia.",
      now: "Fijar de inmediato un calendario regular.",
      later: "Sentar un precedente de un ritmo permanente, para que el acceso no dependa de quién ocupe el cargo."
    },
    fr: {
      title: "Entretiens individuels et séances de questions ouvertes",
      blurb: "Des réponses aux questions budgétaires en personne et en public, de façon régulière.",
      now: "Établir tout de suite un calendrier régulier.",
      later: "Créer un précédent pour un rythme permanent, afin que l’accès ne dépende pas de la personne qui occupe le poste."
    }
  },
  {
    kind: "new",
    icon: "calendar",
    title: "Consistent program updates",
    blurb: "Everyone knows what's going on without having to ask.",
    now: "Start simple updates with the Comms Director and each program.",
    later: "A standard update format that outlasts my term.",
    es: {
      title: "Actualizaciones constantes de los programas",
      blurb: "Todos saben qué está pasando sin tener que preguntar.",
      now: "Empezar con actualizaciones sencillas junto con la dirección de Comunicaciones y cada programa.",
      later: "Un formato de actualización estándar que dure más que mi mandato."
    },
    fr: {
      title: "Mises à jour régulières des programmes",
      blurb: "Tout le monde sait ce qui se passe sans avoir à demander.",
      now: "Lancer des mises à jour simples avec la direction de la communication et chaque programme.",
      later: "Un format de mise à jour standard qui survive à mon mandat."
    }
  },
  {
    kind: "new",
    icon: "house",
    title: "Washington IOP House",
    blurb: "A home base for interns and anyone in the IOP spending the summer in DC.",
    now: "Within my first month, survey interested students on who would use it and what they need, then bring SAC a costed proposal in time for summer planning.",
    later: "If the numbers work, run it for a summer, then expand the IOP summer community to other service hubs, meeting students where they are rather than limiting it to the largest concentration.",
    es: {
      title: "Casa del IOP en Washington",
      blurb: "Una base para los pasantes y para cualquier persona del IOP que pase el verano en DC.",
      now: "En mi primer mes, encuestar a los estudiantes interesados para saber quiénes lo usarían y qué necesitan, y luego presentar al SAC una propuesta con costos a tiempo para la planificación del verano.",
      later: "Si los números funcionan, ponerlo en marcha durante un verano y luego ampliar la comunidad de verano del IOP a otros centros de servicio público, encontrándonos con los estudiantes donde están en lugar de limitarla a la mayor concentración."
    },
    fr: {
      title: "Maison de l’IOP à Washington",
      blurb: "Un point d’ancrage pour les stagiaires et toute personne de l’IOP qui passe l’été à Washington (DC).",
      now: "Dans mon premier mois, sonder les étudiants intéressés pour savoir qui l’utiliserait et de quoi ils ont besoin, puis présenter au SAC une proposition chiffrée à temps pour la planification de l’été.",
      later: "Si les chiffres tiennent la route, le lancer pour un été, puis étendre la communauté estivale de l’IOP à d’autres pôles de service public, en allant à la rencontre des étudiants là où ils se trouvent plutôt que de la limiter à la plus grande concentration."
    }
  }
];
