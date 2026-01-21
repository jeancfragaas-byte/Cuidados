
import { ContentItem, ExerciseItem, Trail } from './types';

export const CATEGORIES = [
  "Bem-estar no trabalho",
  "Organização da rotina",
  "Limites profissionais",
  "Saúde mental no contexto laboral",
  "Direitos e pausas"
];

export const STATIC_REFLECTIONS = [
  "O cuidado com o outro começa pelo respeito ao seu próprio ritmo.",
  "Pequenas pausas ao longo do dia ajudam a manter a clareza mental.",
  "Reconhecer seus limites é um sinal de maturidade profissional.",
  "A qualidade do seu trabalho depende também do seu bem-estar.",
  "Respire fundo. O momento presente é o único que você pode habitar agora.",
  "Organizar sua rotina é uma forma simples de reduzir a ansiedade diária.",
  "Desconectar-se após o expediente é essencial para a longevidade da carreira.",
  "Sua saúde é a ferramenta mais importante de seu trabalho.",
  "Permita-se alguns minutos de silêncio antes de iniciar a próxima tarefa.",
  "O equilíbrio entre vida pessoal e profissional é um processo contínuo."
];

export const CONTENTS: ContentItem[] = [
  {
    id: '1',
    category: "Bem-estar no trabalho",
    title: "A Importância da Pausa Ativa",
    shortDescription: "Pequenos intervalos podem renovar sua energia mental.",
    fullContent: "A pausa ativa não é apenas parar de trabalhar; é mudar o foco. Levantarse, alongar os braços ou simplesmente olhar pela janela por dois minutos ajuda o cérebro a processar informações e reduz a fadiga acumulada. No cotidiano do profissional social, onde a carga emocional é presente, esses momentos são fundamentais para a manutenção da saúde ocupacional.",
    readTime: "2 min"
  },
  {
    id: '2',
    category: "Limites profissionais",
    title: "Estabelecendo Fronteiras Saudáveis",
    shortDescription: "Saiba separar o compromisso profissional da carga pessoal.",
    fullContent: "O engajamento com as causas sociais é nobre, mas requer limites claros para evitar o esgotamento. Definir horários de desconexão e entender que a resolução de problemas estruturais não depende apenas do indivíduo é essencial. Proteger seu tempo de descanso é um ato de responsabilidade profissional.",
    readTime: "3 min"
  },
  {
    id: '3',
    category: "Saúde mental no contexto laboral",
    title: "Entendendo o Estresse Ocupacional",
    shortDescription: "Conhecer os sinais é o primeiro passo para a prevenção.",
    fullContent: "O estresse no trabalho é uma resposta física e emocional a exigências que excedem as capacidades do trabalhador. Sinais como cansaço persistente ou dificuldade de concentração devem ser observados como alertas para a necessidade de reorganização de tarefas e busca por momentos de descompressão.",
    readTime: "4 min"
  },
  {
    id: '4',
    category: "Organização da rotina",
    title: "Gestão do Tempo e Prioridades",
    shortDescription: "Como organizar o dia para evitar a sobrecarga.",
    fullContent: "Uma rotina bem estruturada diminui a ansiedade. Liste as tarefas do dia e identifique o que é urgente versus o que é importante. Lembre-se de incluir no cronograma os tempos de deslocamento e as pausas necessárias. A organização é uma ferramenta de cuidado.",
    readTime: "3 min"
  },
  {
    id: '5',
    category: "Direitos e pausas",
    title: "O Direito ao Descanso",
    shortDescription: "Conheça os fundamentos legais do repouso no trabalho.",
    fullContent: "O descanso intrajornada e o repouso semanal são direitos conquistados que visam a recuperação física e mental. Respeitar esses intervalos é vital para a longevidade da carreira e para a qualidade do serviço prestado à sociedade.",
    readTime: "2 min"
  }
];

export const EXERCISES: ExerciseItem[] = [
  {
    id: 'e1',
    title: 'Respiração 4-4-4',
    duration: 1,
    type: 'breathing',
    description: 'Inspire por 4 segundos, segure por 4, expire por 4.'
  },
  {
    id: 'e2',
    title: 'Pausa Consciente',
    duration: 3,
    type: 'mindfulness',
    description: 'Observe 3 sons, 3 cores e 3 sensações físicas ao seu redor.'
  },
  {
    id: 'e3',
    title: 'Alongamento de Pescoço',
    duration: 1,
    type: 'stretch',
    description: 'Movimentos suaves laterais para aliviar a tensão cervical.'
  },
  {
    id: 'e4',
    title: 'Foco na Respiração',
    duration: 5,
    type: 'breathing',
    description: 'Acompanhe o ritmo natural do ar entrando e saindo, sem pressa.'
  }
];

export const TRAILS: Trail[] = [
  {
    id: 't1',
    title: 'Pausas ao Longo do Dia',
    description: 'Uma sequência de conteúdos e exercícios para integrar ao seu expediente.',
    steps: ['1', 'e1', '4', 'e3']
  },
  {
    id: 't2',
    title: 'Redução do Estresse',
    description: 'Aprenda sobre limites e pratique a calma em momentos críticos.',
    steps: ['3', 'e2', '2', 'e4']
  }
];
