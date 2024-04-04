let participantes = [
  {
    nome: 'Camila Silva',
    email: 'camilasilva@gmail.com',
    dataInscricao: new Date(2024, 2, 28),
    dataCheckIn: new Date(2024, 2, 30)
  },
  {
    nome: 'Rafael Oliveira',
    email: 'rafaeloliveira@gmail.com',
    dataInscricao: new Date(2024, 2, 25),
    dataCheckIn: null
  },
  {
    nome: 'Juliana Martins',
    email: 'julianamartins@gmail.com',
    dataInscricao: new Date(2024, 2, 22),
    dataCheckIn: null
  },
  {
    nome: 'Marcos Costa',
    email: 'marcoscosta@gmail.com',
    dataInscricao: new Date(2024, 2, 19),
    dataCheckIn: null
  },
  {
    nome: 'Carla Lima',
    email: 'carlalima@gmail.com',
    dataInscricao: new Date(2024, 2, 16),
    dataCheckIn: new Date(2024, 2, 18)
  },
  {
    nome: 'Lucas Pereira',
    email: 'lucaspereira@gmail.com',
    dataInscricao: new Date(2024, 2, 13),
    dataCheckIn: new Date(2024, 2, 15)
  },
  {
    nome: 'Ana Souza',
    email: 'anasouza@gmail.com',
    dataInscricao: new Date(2024, 2, 10),
    dataCheckIn: new Date(2024, 2, 12)
  },
  {
    nome: 'Pedro Santos',
    email: 'pedrosantos@gmail.com',
    dataInscricao: new Date(2024, 2, 7),
    dataCheckIn: new Date(2024, 2, 9)
  },
  {
    nome: 'Maria Oliveira',
    email: 'mariaoliveira@gmail.com',
    dataInscricao: new Date(2024, 2, 4),
    dataCheckIn: new Date(2024, 2, 6)
  },
  {
    nome: 'João Silva',
    email: 'joaosilva@gmail.com',
    dataInscricao: new Date(2024, 2, 1),
    dataCheckIn: new Date(2024, 2, 3)
  }
];

const novoParticipante = (participante) => {
  const dataInscricao = dayjs(participante.dataInscricao).fromNow()
  let dataCheckIn = dayjs(participante.dataCheckIn).fromNow()
  if (!participante.dataCheckIn) {
    dataCheckIn =
      `<button onclick="fazerCheckIn(event)" 
     data-email="${participante.email}"
    >
    Confirmar check-in
    </button>`
  }

  return `
  <tr>
        <td>
          <strong>
            ${participante.nome}
          </strong>
          <br>
          <small>
            ${participante.email}
          </small>
        </td>
        <td>${dataInscricao}</td>
        <td>${dataCheckIn}</td>
      </tr>
  `
}

const atualizarLista = (participantes) => {
  let output = ''

  for (participante of participantes) {
    output += novoParticipante(participante)
  }

  document.querySelector('tbody').innerHTML = output
}

atualizarLista(participantes)

const adicionarParticipante = (event) => {
  event.preventDefault()

  const dadosFormulario = new FormData(event.target)
  const participante = {
    nome: dadosFormulario.get('nome'),
    email: dadosFormulario.get('email'),
    dataInscricao: new Date(),
    dataCheckIn: null,
  }

  // verificar se participante ja existe

  if(participantes.find((p) => p.email == participante.email)) {
    alert('Email já cadastrado!')
    return
  }

  participantes = [participante, ...participantes]

  atualizarLista(participantes)

  // limpando o formulario

  event.target.querySelector('[name="nome"]').value = ""
  event.target.querySelector('[name="email"]').value = ""
}

const fazerCheckIn = (event) => {
  if (confirm('tem certeza que deseja realizar o check-in?')) {
    const participante = participantes.find((participante) => participante.email == event.target.dataset.email)

    participante.dataCheckIn = new Date()

    atualizarLista(participantes)
  }
}