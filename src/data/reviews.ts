export interface Review {
  author: string;
  date: string;
  stars: number;
  text: string;
  avatarGradient: string;
  initial: string;
}

export const REVIEWS: Review[] = [
  {
    author: 'Bruno Oswaldo da Rosa',
    date: '9 meses atrás',
    stars: 5,
    initial: 'B',
    avatarGradient: 'linear-gradient(135deg,#c9a84c,#8a6a1f)',
    text: 'Atendimento excelente! Todas as atendentes são mulheres muito educadas, atenciosas e entendem muito do que fazem. Fui super bem orientado na hora de escolher os acabamentos. Um ambiente acolhedor e profissional. Super recomendo.',
  },
  {
    author: 'Ademar Rocznieski',
    date: '4 meses atrás · Local Guide',
    stars: 5,
    initial: 'A',
    avatarGradient: 'linear-gradient(135deg,#4c8fc9,#1f4a8a)',
    text: 'Ótimo atendimento, produtos de qualidade, os vendedores ajudam como consultores, facilitando nas escolhas.',
  },
  {
    author: 'Simone Fonseca',
    date: '9 meses atrás',
    stars: 5,
    initial: 'S',
    avatarGradient: 'linear-gradient(135deg,#c94c7a,#8a1f4c)',
    text: 'Quando fomos até a loja tínhamos todas as dúvidas. Fomos bem recebidos com muita atenção e objetivos, com a principal demonstração do produto. A qualidade foi fundamental para nossa casa.',
  },
  {
    author: 'Thiago Da Rosa',
    date: '9 meses atrás',
    stars: 5,
    initial: 'T',
    avatarGradient: 'linear-gradient(135deg,#4cc97a,#1f8a4c)',
    text: 'Ótimo atendimento, vendedoras experientes, loja linda e com diversidade de produtos.',
  },
  {
    author: 'Patricia Hammes Fritsch',
    date: '9 meses atrás · 2 avaliações',
    stars: 5,
    initial: 'P',
    avatarGradient: 'linear-gradient(135deg,#c97a4c,#8a4c1f)',
    text: 'A qualidade dos produtos é impecável, e o atendimento foi sempre profissional e atencioso. Recomendo de olhos fechados! Cinco estrelas bem merecidas!',
  },
  {
    author: 'Amelia Elizete Noronha',
    date: 'Um ano atrás',
    stars: 5,
    initial: 'A',
    avatarGradient: 'linear-gradient(135deg,#7a4cc9,#4c1f8a)',
    text: 'Empresa com uma equipe de profissionais competentes e de muita responsabilidade. A loja fornece materiais de ótima qualidade. Um atendimento maravilhoso, parabéns a toda a equipe!',
  },
  {
    author: 'Goncho Eco',
    date: '2 anos atrás · Local Guide',
    stars: 5,
    initial: 'G',
    avatarGradient: 'linear-gradient(135deg,#4cc9c9,#1f7a8a)',
    text: 'Na Compor você encontra grande variedade de pisos, porcelanatos, acabamentos. O atendimento é personalizado, com orçamentos precisos e acompanhamento na obra. Preço justo. Super recomendamos!',
  },
  {
    author: 'Marilu Kleinert',
    date: 'Um ano atrás · 3 avaliações',
    stars: 5,
    initial: 'M',
    avatarGradient: 'linear-gradient(135deg,#c9c94c,#8a7a1f)',
    text: 'Ótimo atendimento e acompanhamento desde o orçamento até o final da obra. Preços justos e produtos de ótima qualidade.',
  },
];
