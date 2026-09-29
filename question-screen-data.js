/**
 * Conteúdo — NR 23 Proteção Contra Incêndios (Brigada de Incêndio - Nível Intermediário) · Coca-Cola
 * Gerado a partir de Roteiro-NR23-Brigada-Incendio.txt
 *
 * Tipos: cover | content | video | image | quiz-intro | question | order | match | compare | reflect | finale
 *
 * Vídeos: SEM embed — só nome + scene/brief no frame "Vídeo a gravar".
 *         Depois cole embed/playerId Panda em cada tela type:"video".
 * Fotos: caminhos placeholder em assets/fotos/ — substitua pelos arquivos reais.
 *
 * Atividades por módulo — cada módulo tem um formato diferente:
 *  M1 Contra o Alarme → 3 question + 1 order (montar o protocolo em 6 passos)
 *  M2 Apaga ou Alimenta? → match (5 pares: situação → efeito no fogo)
 *  M3 Combinação Certa → question com foto (classe de incêndio → agente)
 *  M4 Caça ao Risco → 3 compare (certo × errado) + 4 question
 *  M5 Guerra de Palpites → 2 reflect (reconheça a reação) + 4 question V/F
 *  M6 Corrente de Decisão → 3 question em cadeia (o erro mostra a consequência)
 *  M7 Roleta da RCP → order (5 etapas) + rhythm (tocar no ritmo das compressões, 100–120/min)
  */
window.QUESTION_SCREEN_SESSION = {
  "meta": {
    "title": "NR 23 – Proteção Contra Incêndios (Brigada de Incêndio - Nível Intermediário)",
    "brand": "TecnoCursos",
    "musicSrc": "musica/musica_foco.mp3"
  },
  "modules": [
    {
      "id": 1,
      "title": "Fundamentos da Brigada de Incêndio",
      "meta": "Vídeos + texto · desafio Contra o Alarme",
      "titleUnlock": {
        "title": "GUARDIÃO DO ALERTA",
        "body": "Você já sabe o que a brigada faz e a ordem dos primeiros minutos.",
        "icon": "🚨"
      },
      "screens": [
        {
          "id": "m1-cover",
          "type": "cover",
          "title": "Módulo 1 — Fundamentos da Brigada de Incêndio",
          "subtitle": "Abertura, composição da brigada e procedimentos básicos — do alerta ao confinamento.",
          "transcript": "Módulo 1: Fundamentos da Brigada de Incêndio.",
          "image": "assets/fotos/capa-modulo1.png",
          "imageAlt": "Instrutora com EPI em fábrica, apontando para equipamentos de combate a incêndio e sinalização da brigada",
          "imagePosition": "18% 82%"
        },
        {
          "id": "m1-v-abertura",
          "type": "video",
          "kicker": "🎥 Vídeo",
          "title": "Os Primeiros Minutos Decidem Tudo",
          "duration": "0:35",
          "embed": "https://player-vz-d35edf2a-8e7.tv.pandavideo.com.br/embed/?v=32bc5670-14b3-4323-b7ac-486cd06a3de6",
          "playerId": "panda-32bc5670-14b3-4323-b7ac-486cd06a3de6",
          "scene": "Abertura com a instrutora Fernanda + takes no escritório Coca-Cola",
          "brief": "Fernanda se apresenta; cortes rápidos: extintor, rota de fuga, colaboradores, quadro elétrico; título sobre fundo vermelho institucional.",
          "body": "Nos primeiros minutos de um princípio de incêndio, quem está treinado faz a diferença entre um susto controlado e uma tragédia. Neste treinamento de NR 23 você aprende a prevenir, combater o início do fogo, apoiar na evacuação e prestar primeiros socorros.",
          "transcript": "Vídeo de abertura: os primeiros minutos decidem tudo."
        },
        {
          "id": "m1-v-oque",
          "type": "video",
          "kicker": "🎥 Vídeo",
          "title": "O Que É a Brigada de Incêndio",
          "duration": "0:40",
          "embed": "https://player-vz-d35edf2a-8e7.tv.pandavideo.com.br/embed/?v=25fb4bf7-7a17-4002-ac13-41773c05cf26",
          "playerId": "panda-25fb4bf7-7a17-4002-ac13-41773c05cf26",
          "scene": "Brigadista com colete laranja no open space Coca-Cola",
          "brief": "Colaborador de colete e crachá circula pelo escritório até o quadro com organograma da brigada.",
          "body": "A Brigada de Incêndio é um grupo organizado de colaboradores, treinados para prevenir e combater um princípio de incêndio, evacuar e prestar primeiros socorros. Na Coca-Cola, são colegas do próprio andar. Objetivo: proteger vida e patrimônio até a chegada do socorro especializado.",
          "transcript": "Vídeo: o que é a Brigada de Incêndio."
        },
        {
          "id": "m1-composicao",
          "type": "content",
          "kicker": "📄 Texto",
          "title": "Composição da Brigada e Atribuições",
          "cards": [
            {
              "icon": "👔",
              "title": "Coordenador Geral",
              "body": "Responsável institucional pela brigada perante a Coca-Cola."
            },
            {
              "icon": "🧭",
              "title": "Líder da Brigada",
              "body": "Comanda a ação nos primeiros minutos de qualquer emergência."
            },
            {
              "icon": "🦺",
              "title": "Brigadistas",
              "body": "Atuam na prevenção, combate ao princípio de incêndio, abandono de área e primeiros socorros."
            }
          ],
          "items": [
            {
              "icon": "🔍",
              "title": "Prevenção:",
              "text": "analisar os riscos existentes no local"
            },
            {
              "icon": "📢",
              "title": "Comunicar:",
              "text": "informar ao coordenador irregularidades de prevenção e proteção"
            },
            {
              "icon": "🗣️",
              "title": "Orientar:",
              "text": "orientar colaboradores do setor sobre prevenção e proteção contra incêndios"
            }
          ],
          "transcript": "Composição da brigada: coordenador, líder e brigadistas; ações de prevenção no dia a dia."
        },
        {
          "id": "m1-v-procedimentos",
          "type": "video",
          "kicker": "🎥 Vídeo",
          "title": "Procedimentos Básicos: do Alerta ao Confinamento",
          "duration": "1:25",
          "embed": "https://player-vz-d35edf2a-8e7.tv.pandavideo.com.br/embed/?v=7df6c91a-ffbc-4d2c-8d9a-467a93a10740",
          "playerId": "panda-7df6c91a-ffbc-4d2c-8d9a-467a93a10740",
          "scene": "Fernanda em câmera + corte de energia e fila de evacuação",
          "brief": "Seis passos: alerta, análise, corte de energia, abandono, primeiros socorros e confinamento/extinção.",
          "body": "Alerta pelos meios disponíveis → líder analisa e decide (aciona Bombeiros se preciso) → corte de energia no quadro → abandono a no mínimo 100 m do sinistro → primeiros socorros → confinamento para evitar propagação e eliminar o sinistro.",
          "transcript": "Vídeo: procedimentos básicos de emergência."
        },
        {
          "id": "m1-quiz-intro",
          "type": "quiz-intro",
          "title": "Desafio — Contra o Alarme",
          "count": 4,
          "minCorrect": 3,
          "icon": "🚨",
          "body": "4 perguntas cronometradas. Mínimo de <strong>3 acertos</strong> para avançar.",
          "transcript": "Desafio do módulo 1: Contra o Alarme."
        },
        {
          "id": "m1-q1",
          "type": "question",
          "question": "O que é a Brigada de Incêndio?",
          "alternatives": [
            {
              "id": "a",
              "text": "Um setor exclusivo da segurança patrimonial",
              "correct": false
            },
            {
              "id": "b",
              "text": "Grupo treinado e capacitado para prevenir, combater um princípio de incêndio, evacuar e prestar primeiros socorros",
              "correct": true
            },
            {
              "id": "c",
              "text": "Somente os bombeiros civis contratados",
              "correct": false
            },
            {
              "id": "d",
              "text": "Um grupo que só age depois que o Corpo de Bombeiros chega",
              "correct": false
            }
          ],
          "explanation": "A brigada é um grupo organizado de colaboradores capacitados para prevenir, combater, evacuar e prestar primeiros socorros.",
          "review": "Definição de Brigada de Incêndio",
          "transcript": "O que é a Brigada de Incêndio?",
          "image": "assets/fotos/m1p1.png",
          "imageAlt": "Equipamentos de brigada: extintores, mangueira, colete, capacete, abrigo de mangueira, kit de primeiros socorros e cone de sinalização",
          "imagePosition": "center 28%"
        },
        {
          "id": "m1-q2",
          "type": "question",
          "question": "Quem comanda a ação nos primeiros minutos de uma emergência?",
          "alternatives": [
            {
              "id": "a",
              "text": "Qualquer visitante presente",
              "correct": false
            },
            {
              "id": "b",
              "text": "O Líder da Brigada",
              "correct": true
            },
            {
              "id": "c",
              "text": "Somente o Corpo de Bombeiros",
              "correct": false
            },
            {
              "id": "d",
              "text": "Ninguém, espera-se a chegada do socorro",
              "correct": false
            }
          ],
          "explanation": "O Líder da Brigada comanda a ação nos primeiros minutos.",
          "review": "Papel do Líder da Brigada",
          "transcript": "Quem comanda a ação nos primeiros minutos de uma emergência?",
          "image": "assets/fotos/m1p2.png",
          "imageAlt": "Líder da brigada com prancheta orientando dois brigadistas, com extintor e ponto de encontro ao fundo"
        },
        {
          "id": "m1-q3",
          "type": "question",
          "question": "Qual é a distância mínima recomendada no abandono de área?",
          "alternatives": [
            {
              "id": "a",
              "text": "10 metros",
              "correct": false
            },
            {
              "id": "b",
              "text": "50 metros",
              "correct": false
            },
            {
              "id": "c",
              "text": "100 metros",
              "correct": true
            },
            {
              "id": "d",
              "text": "Não há distância definida",
              "correct": false
            }
          ],
          "explanation": "No abandono de área, remova todos para um local seguro a no mínimo 100 metros do sinistro.",
          "review": "Distância mínima no abandono de área",
          "transcript": "Qual é a distância mínima recomendada no abandono de área?",
          "image": "assets/fotos/m1p3.png",
          "imageAlt": "Colaboradores evacuando pela saída de emergência em direção ao ponto de encontro"
        },
        {
          "id": "m1-q4",
          "type": "question",
          "question": "Qual é a ordem correta dos procedimentos básicos de emergência?",
          "alternatives": [
            {
              "id": "a",
              "text": "Alerta → Análise → Corte de energia → Abandono → Socorros → Confinamento",
              "correct": true
            },
            {
              "id": "b",
              "text": "Confinamento → Alerta → Abandono",
              "correct": false
            },
            {
              "id": "c",
              "text": "Abandono → Alerta → Corte de energia",
              "correct": false
            },
            {
              "id": "d",
              "text": "Análise → Confinamento → Alerta",
              "correct": false
            }
          ],
          "explanation": "A sequência é: alerta, análise, corte de energia, abandono, primeiros socorros e confinamento.",
          "review": "Ordem dos procedimentos básicos",
          "transcript": "Qual é a ordem correta dos procedimentos básicos de emergência?",
          "image": "assets/fotos/m1p4.png",
          "imageAlt": "Quatro etapas de emergência: telefone de alerta, acionamento do alarme, saída de emergência e extintor combatendo o fogo"
        }
      ]
    },
    {
      "id": 2,
      "title": "O Fogo: Teoria e Métodos de Extinção",
      "meta": "Vídeos + texto · desafio Apaga ou Alimenta?",
      "titleUnlock": {
        "title": "MESTRE DO TETRAEDRO",
        "body": "Você entende o fogo e sabe o que o apaga — ou o alimenta.",
        "icon": "🔥"
      },
      "screens": [
        {
          "id": "m2-cover",
          "type": "cover",
          "title": "Módulo 2 — O Fogo: Teoria e Métodos de Extinção",
          "subtitle": "Tetraedro do fogo e os três métodos: abafamento, resfriamento e retirada do material.",
          "transcript": "Módulo 2: O Fogo — teoria e métodos de extinção.",
          "image": "assets/fotos/m2-capa.png",
          "imageAlt": "Instrutora com EPI apontando para o triângulo do fogo na parede, com extintor e hidrante ao lado",
          "imagePosition": "70% 78%"
        },
        {
          "id": "m2-v-oque",
          "type": "video",
          "kicker": "🎥 Vídeo",
          "title": "O Que É o Fogo, Afinal?",
          "duration": "0:30",
          "embed": "https://player-vz-d35edf2a-8e7.tv.pandavideo.com.br/embed/?v=15078fb0-2eea-4e5c-be9e-8c7ed61ae9d1",
          "playerId": "panda-15078fb0-2eea-4e5c-be9e-8c7ed61ae9d1",
          "scene": "Animação estilo Pixar — chama estilizada",
          "brief": "Chama sobre madeira em fundo escuro; câmera gira revelando estrutura interna; vira definição técnica.",
          "body": "O fogo é uma reação química com desprendimento de luz e calor. Entender como essa reação acontece é o que separa quem teme o fogo de quem sabe controlá-lo.",
          "transcript": "Vídeo: o que é o fogo."
        },
        {
          "id": "m2-v-tetraedro",
          "type": "video",
          "kicker": "🎥 Vídeo",
          "title": "O Tetraedro do Fogo",
          "duration": "0:55",
          "embed": "https://player-vz-d35edf2a-8e7.tv.pandavideo.com.br/embed/?v=66974896-42bf-412c-8b85-30e5d8a90783",
          "playerId": "panda-66974896-42bf-412c-8b85-30e5d8a90783",
          "scene": "Animação 3D do tetraedro do fogo",
          "brief": "Quatro faces: calor, comburente (oxigênio), material combustível e reação em cadeia.",
          "body": "Para o fogo existir: calor, comburente (oxigênio), material combustível e reação em cadeia. Remova um dos quatro lados e o fogo se apaga.",
          "transcript": "Vídeo: o tetraedro do fogo."
        },
        {
          "id": "m2-tetraedro-elementos",
          "type": "content",
          "kicker": "📄 Texto",
          "title": "Tetraedro do Fogo: os 4 Elementos",
          "body": "O tetraedro do fogo é o modelo que explica como o fogo começa e se mantém. Tirando qualquer um dos quatro elementos, o fogo se apaga.",
          "items": [
            { "icon": "🪵", "title": "Combustível:", "text": "o material que queima — sólido (madeira, papel), líquido (gasolina, álcool) ou gasoso (gás de cozinha)." },
            { "icon": "💨", "title": "Comburente:", "text": "o que torna a queima possível — o oxigênio do ar é o mais comum." },
            { "icon": "🔥", "title": "Calor:", "text": "a energia que inicia o fogo, como uma faísca, e leva o combustível à temperatura de ignição." },
            { "icon": "🔁", "title": "Reação em cadeia:", "text": "o calor das próprias chamas alimenta a queima, fazendo o fogo se propagar sozinho." }
          ],
          "transcript": "Tetraedro do fogo: os quatro elementos essenciais."
        },
        {
          "id": "m2-v-metodos",
          "type": "video",
          "kicker": "🎥 Vídeo",
          "title": "Métodos de Extinção: Abafamento, Resfriamento e Retirada",
          "duration": "1:15",
          "embed": "https://player-vz-d35edf2a-8e7.tv.pandavideo.com.br/embed/?v=8923c9ca-2d62-4eca-be47-d59d8c7331ba",
          "playerId": "panda-8923c9ca-2d62-4eca-be47-d59d8c7331ba",
          "scene": "Fernanda em câmera + animações de abafamento e resfriamento",
          "brief": "Abafamento (oxigênio), resfriamento (calor/água) e retirada do material combustível.",
          "body": "Abafamento retira o oxigênio (abaixo de 13% não sustenta fogo). Resfriamento retira o calor, geralmente com água. Retirada do material elimina o combustível. Essa base define qual extintor usar.",
          "transcript": "Vídeo: métodos de extinção."
        },
        {
          "id": "m2-transmissao",
          "type": "content",
          "kicker": "📄 Texto",
          "title": "Transmissão de Calor",
          "cards": [
            {
              "title": "Condução",
              "body": "Transmite a temperatura molécula a molécula. Ex.: colher na água fervente.",
              "image": "assets/fotos/m2-conducao.png",
              "imageAlt": "Colher no vapor de água fervente, com o cabo aquecido — condução de calor"
            },
            {
              "title": "Convecção",
              "body": "Ar quente sobe e encontra ar frio, formando looping. Pode atingir o ponto de fulgor e iniciar novo foco.",
              "image": "assets/fotos/m2-conveccao.png",
              "imageAlt": "Panela fervendo com setas de ar quente subindo e ar frio descendo — convecção"
            },
            {
              "title": "Irradiação",
              "body": "Transmissão por ondas caloríferas de uma fonte de calor, como o sol.",
              "image": "assets/fotos/m2-irradiacao.png",
              "imageAlt": "Pessoa aquecendo as mãos diante da lareira — irradiação de calor"
            }
          ],
          "transcript": "Três formas de transmissão de calor: condução, convecção e irradiação."
        },
        {
          "id": "m2-quiz-intro",
          "type": "quiz-intro",
          "title": "Desafio — Apaga ou Alimenta?",
          "count": 1,
          "minCorrect": 1,
          "icon": "🧯",
          "body": "Ligue cada situação ao efeito dela sobre o fogo: <strong>APAGA</strong> ou <strong>ALIMENTA</strong>. Só avança com todos os pares certos.",
          "transcript": "Desafio do módulo 2: Apaga ou Alimenta?"
        },
        {
          "id": "m2-match",
          "type": "match",
          "title": "Apaga ou Alimenta?",
          "body": "Toque numa situação e depois no efeito dela sobre o fogo.",
          "leftTitle": "Situação",
          "rightTitle": "Efeito no fogo",
          "pairs": [
            {
              "ex": "Cobrir a chama com uma manta",
              "body": "Apaga: tira o oxigênio"
            },
            {
              "ex": "Jogar água na base da chama",
              "body": "Apaga: tira o calor"
            },
            {
              "ex": "Levar o material que queima para uma área isolada",
              "body": "Apaga: tira o combustível"
            },
            {
              "ex": "Abrir a janela perto do foco de fogo",
              "body": "Alimenta: dá mais oxigênio"
            },
            {
              "ex": "Empilhar papelão perto de um ponto quente",
              "body": "Alimenta: dá mais combustível"
            }
          ],
          "review": "Tetraedro do fogo: o que apaga e o que alimenta",
          "transcript": "Ligue cada situação ao efeito dela sobre o fogo: apaga ou alimenta."
        }
      ]
    },
    {
      "id": 3,
      "title": "Classes de Incêndio e Extintores",
      "meta": "Vídeos + texto · desafio Combinação Certa",
      "titleUnlock": {
        "title": "AGENTE CERTO",
        "body": "Você escolhe a classe e o extintor corretos.",
        "icon": "🧯"
      },
      "screens": [
        {
          "id": "m3-cover",
          "type": "cover",
          "title": "Módulo 3 — Classes de Incêndio e Extintores",
          "subtitle": "Classes A, B, C e D e como operar água, PQS e CO₂.",
          "transcript": "Módulo 3: Classes de Incêndio e Extintores.",
          "image": "assets/fotos/capa-modulo3.png",
          "imageAlt": "Capa do módulo 3: classes de incêndio e extintores no ambiente de trabalho"
        },
        {
          "id": "m3-v-classes",
          "type": "video",
          "kicker": "🎥 Vídeo",
          "title": "As 4 Classes de Incêndio",
          "duration": "1:05",
          "embed": "https://player-vz-d35edf2a-8e7.tv.pandavideo.com.br/embed/?v=7b1106bc-89a0-4f80-a50c-1751898d7aaf",
          "playerId": "panda-7b1106bc-89a0-4f80-a50c-1751898d7aaf",
          "scene": "Animação das 4 classes + cenas reais no escritório",
          "brief": "Classe A papel/tecido/madeira; B líquidos/gases; C elétricos energizados; D metais pirofóricos.",
          "body": "Classe A: sólidos combustíveis (queimam em superfície e profundidade, deixam resíduos). Classe B: líquidos e gases (só superfície, sem resíduos). Classe C: equipamentos elétricos energizados — sem energia viram Classe A. Classe D: metais pirofóricos (mais raros no escritório).",
          "transcript": "Vídeo: as 4 classes de incêndio."
        },
        {
          "id": "m3-v-agua-pqs",
          "type": "video",
          "kicker": "🎥 Vídeo",
          "title": "Extintores de Água e PQS: Como Operar",
          "duration": "1:25",
          "embed": "https://player-vz-d35edf2a-8e7.tv.pandavideo.com.br/embed/?v=915e1a67-282e-460c-aa69-d0442e339478",
          "playerId": "panda-915e1a67-282e-460c-aa69-d0442e339478",
          "scene": "Demonstração real no corredor Coca-Cola (sem fogo)",
          "brief": "Retirar da parede, tirar trava, jato em ziguezague na base; PQS a 4–6 m formando nuvem.",
          "body": "Água: 10 L, alcance 8–10 m. PQS: 1 a 12 kg, aproximar 4–6 m, jato horizontal em ziguezague. Sempre: parede → trava → mangueira → base do fogo.",
          "transcript": "Vídeo: operar extintores de água e PQS."
        },
        {
          "id": "m3-v-co2",
          "type": "video",
          "kicker": "🎥 Vídeo",
          "title": "Extintor de CO₂ e o Uso Indevido",
          "duration": "0:45",
          "embed": "https://player-vz-d35edf2a-8e7.tv.pandavideo.com.br/embed/?v=7373b4a0-0933-405d-a613-2f559dc76b0c",
          "playerId": "panda-7373b4a0-0933-405d-a613-2f559dc76b0c",
          "scene": "Demonstração CO₂ + alerta legal",
          "brief": "Segurar o punho isolante (nunca a mangueira fria); uso indevido é crime.",
          "body": "CO₂: 4–6 kg, alcance 2–4 m. Empunhe o punho isolante — a mangueira fica extremamente fria. Aproximar a 4 m, nuvem em ziguezague. Uso indevido fora de emergência é crime contra o patrimônio físico e humano.",
          "transcript": "Vídeo: extintor de CO₂ e uso indevido."
        },
        {
          "id": "m3-agentes",
          "type": "content",
          "kicker": "📄 Texto",
          "skin": "agents",
          "cardAspect": "square",
          "title": "Qual agente usar em cada classe",
          "cards": [
            {
              "title": "Água",
              "lead": "Classe A",
              "body": "Madeira, papel, tecidos e resíduos sólidos comuns.",
              "image": "assets/fotos/agua.png",
              "imageAlt": "Extintor de água em uso",
              "tone": "agua"
            },
            {
              "title": "Pó Químico Seco",
              "lead": "Classes B e C",
              "body": "Líquidos inflamáveis e equipamentos elétricos energizados.",
              "image": "assets/fotos/pqs.png",
              "imageAlt": "Extintor de pó químico seco em uso",
              "tone": "pqs"
            },
            {
              "title": "Gás Carbônico (CO₂)",
              "lead": "Classes B e C",
              "body": "Painéis e equipamentos elétricos sensíveis — sem deixar resíduos.",
              "image": "assets/fotos/gás.png",
              "imageAlt": "Extintor de gás carbônico em painel elétrico",
              "tone": "co2"
            }
          ],
          "transcript": "Três agentes extintores: água na classe A; PQS e CO₂ nas classes B e C."
        },
        {
          "id": "m3-equipamentos",
          "type": "content",
          "kicker": "📄 Texto",
          "title": "Mangueira e Hidrante",
          "cards": [
            {
              "title": "Mangueira",
              "body": "Fibra sintética com revestimento de borracha; 15 ou 30 m (30 m não é mais usado).",
              "image": "assets/fotos/mangueira.jpg",
              "imageAlt": "Mangueira de incêndio"
            },
            {
              "title": "Hidrante / abrigo",
              "body": "Chapa de aço, porta com ventilação e visor “Incêndio”, suporte em meia-lua.",
              "image": "assets/fotos/hidrante.png",
              "imageAlt": "Hidrante e abrigo de incêndio"
            }
          ],
          "transcript": "Mangueira e hidrante: equipamentos de apoio da brigada."
        },
        {
          "id": "m3-quiz-intro",
          "type": "quiz-intro",
          "title": "Desafio — Combinação Certa",
          "count": 4,
          "minCorrect": 3,
          "icon": "🎯",
          "body": "Combine a <strong>classe de incêndio</strong> com o <strong>agente extintor</strong> certo. Mínimo de <strong>3 acertos</strong>.",
          "transcript": "Desafio do módulo 3: Combinação Certa."
        },
        {
          "id": "m3-q1",
          "type": "question",
          "variant": "lista",
          "question": "Classe A — papel, tecido, madeira. Qual agente?",
          "alternatives": [
            {
              "id": "a",
              "text": "Água",
              "correct": true
            },
            {
              "id": "b",
              "text": "Pó Químico Seco",
              "correct": false
            },
            {
              "id": "c",
              "text": "CO₂",
              "correct": false
            }
          ],
          "explanation": "Água é indicada para Classe A.",
          "review": "Agente para Classe A",
          "transcript": "Classe A — papel, tecido, madeira. Qual agente?",
          "image": "assets/fotos/m3p1.png",
          "imageAlt": "Materiais combustíveis de classe A: papel, tecido e madeira"
        },
        {
          "id": "m3-q2",
          "type": "question",
          "variant": "lista",
          "question": "Classe B — álcool, gasolina, GLP. Qual agente?",
          "alternatives": [
            {
              "id": "a",
              "text": "Água",
              "correct": false
            },
            {
              "id": "b",
              "text": "Pó Químico Seco",
              "correct": true
            },
            {
              "id": "c",
              "text": "Nenhum dos anteriores",
              "correct": false
            }
          ],
          "explanation": "PQS é indicado para Classes B e C. (CO₂ também serve em B/C; nesta rodada o gabarito do roteiro é PQS.)",
          "review": "Agente para Classe B",
          "transcript": "Classe B — álcool, gasolina, GLP. Qual agente?",
          "image": "assets/fotos/m3p2.png",
          "imageAlt": "Líquidos inflamáveis de classe B: álcool, gasolina e GLP"
        },
        {
          "id": "m3-q3",
          "type": "question",
          "variant": "lista",
          "question": "Classe C — quadro elétrico energizado. Qual agente?",
          "alternatives": [
            {
              "id": "a",
              "text": "Água",
              "correct": false
            },
            {
              "id": "b",
              "text": "CO₂",
              "correct": true
            },
            {
              "id": "c",
              "text": "Qualquer um, tanto faz",
              "correct": false
            }
          ],
          "explanation": "CO₂ (ou PQS) para Classe C. Nunca água em equipamento energizado.",
          "review": "Agente para Classe C",
          "transcript": "Classe C — quadro elétrico energizado. Qual agente?",
          "image": "assets/fotos/m3p3.png",
          "imageAlt": "Quadro elétrico energizado, típico de incêndio classe C"
        },
        {
          "id": "m3-q4",
          "type": "question",
          "variant": "lista",
          "question": "Classe D — raspas de metal. Qual agente?",
          "alternatives": [
            {
              "id": "a",
              "text": "Agente extintor específico para metais",
              "correct": true
            },
            {
              "id": "b",
              "text": "Água",
              "correct": false
            },
            {
              "id": "c",
              "text": "Pó Químico Seco comum",
              "correct": false
            }
          ],
          "explanation": "Classe D exige agente específico para metais — não use água nem PQS comum.",
          "review": "Agente para Classe D",
          "transcript": "Classe D — raspas de metal. Qual agente?",
          "image": "assets/fotos/m3p4.png",
          "imageAlt": "Raspas e resíduos de metal, típicos de incêndio classe D"
        }
      ]
    },
    {
      "id": 4,
      "title": "Prevenção, Riscos e Ação em Emergência",
      "meta": "Vídeos + fotos + texto · Certo × errado + desafio Caça ao Risco",
      "titleUnlock": {
        "title": "OLHO NO RISCO",
        "body": "Você previne no dia a dia e age nos primeiros segundos.",
        "icon": "👁️"
      },
      "screens": [
        {
          "id": "m4-cover",
          "type": "cover",
          "title": "Módulo 4 — Prevenção, Riscos e Ação em Emergência",
          "subtitle": "Hábitos de prevenção, primeiros segundos, rotas de fuga e riscos da edificação.",
          "transcript": "Módulo 4: Prevenção, riscos da edificação e ação em emergência.",
          "image": "assets/fotos/capa-modulo4.png",
          "imageAlt": "Capa do módulo 4: prevenção, riscos e ação em emergência"
        },
        {
          "id": "m4-v-prevenir",
          "type": "video",
          "kicker": "🎥 Vídeo",
          "title": "Como Prevenir um Incêndio no Dia a Dia",
          "duration": "1:00",
          "embed": "https://player-vz-d35edf2a-8e7.tv.pandavideo.com.br/embed/?v=a7feb7ef-d689-456d-8cfb-e83018ad7b75",
          "playerId": "panda-a7feb7ef-d689-456d-8cfb-e83018ad7b75",
          "scene": "Hábitos reais no escritório Coca-Cola",
          "brief": "Desligar carregadores, organizar cabos, lixeira limpa, checar equipamentos ao sair; alerta de gás.",
          "body": "Não use lixo como cinzeiro. Desligue equipamentos da tomada. Não cubra fios com tapetes nem use plugues em T. Antes de sair, confira se nada ficou ligado. Cheiro de gás: ventile, não mexa em interruptores nem acenda fósforo.",
          "transcript": "Vídeo: prevenção no dia a dia."
        },
        {
          "id": "m4-v-primeiros",
          "type": "video",
          "kicker": "🎥 Vídeo",
          "title": "Em Caso de Incêndio: Como Agir nos Primeiros Segundos",
          "duration": "1:20",
          "embed": "https://player-vz-d35edf2a-8e7.tv.pandavideo.com.br/embed/?v=c71bdfa9-6ee9-4600-88b6-01926957e370",
          "playerId": "panda-c71bdfa9-6ee9-4600-88b6-01926957e370",
          "scene": "Alarme, escadas (nunca elevador) e abafar roupas em chamas",
          "brief": "Avaliar à distância segura, dar alarme, ligar 193 se preciso; sair fechando portas sem trancar; rolar/cobertor se a roupa pegar fogo.",
          "body": "Avalie à distância segura. Dê o alarme e, se preciso, ligue 193. Se não dominar o fogo, saia fechando portas/janelas sem trancar, desligue a eletricidade. Use escada, nunca elevador. Se a roupa pegar fogo: não corra — role no chão ou use cobertor.",
          "transcript": "Vídeo: primeiros segundos em caso de incêndio."
        },
        {
          "id": "m4-foto-consequencias",
          "type": "content",
          "kicker": "📷 Foto",
          "title": "O Que Está em Jogo: Consequências de um Incêndio ou Explosão de Gás",
          "cardAspect": "landscape",
          "cards": [
            {
              "image": "assets/fotos/consequencias1.png",
              "imageAlt": "Consequências de incêndio ou explosão — imagem 1"
            },
            {
              "image": "assets/fotos/consequencias2.png",
              "imageAlt": "Consequências de incêndio ou explosão — imagem 2"
            }
          ],
          "transcript": "Foto: consequências de um incêndio ou explosão de gás."
        },
        {
          "id": "m4-foto-rotas",
          "type": "image",
          "layout": "stack",
          "kicker": "📷 Foto",
          "title": "Sinalização das Rotas de Fuga no Escritório",
          "image": "assets/fotos/m4-sinalizacao1.png",
          "imageAlt": "Sinalização de rota de fuga — imagem 1",
          "imageFit": "contain",
          "transcript": "Foto: sinalização das rotas de fuga no escritório."
        },
        {
          "id": "m4-foto-rotas-2",
          "type": "image",
          "layout": "stack",
          "kicker": "📷 Foto",
          "title": "Sinalização das Rotas de Fuga no Escritório",
          "image": "assets/fotos/m4-sinalizacao.png",
          "imageAlt": "Sinalização de rota de fuga — imagem 2",
          "imageFit": "contain",
          "transcript": "Foto: sinalização das rotas de fuga — imagem 2."
        },
        {
          "id": "m4-riscos",
          "type": "content",
          "kicker": "📄 Texto",
          "title": "Riscos Específicos da Edificação",
          "cardAspect": "square",
          "cards": [
            {
              "title": "Estruturais",
              "body": "Materiais inflamáveis, pé-direito baixo, ausência de rotas de fuga.",
              "image": "assets/fotos/m4-estrutural.png",
              "imageAlt": "Riscos estruturais"
            },
            {
              "title": "Operacionais",
              "body": "Máquinas quentes, eletricidade, soldas, combustíveis.",
              "image": "assets/fotos/m4-operacionais.png",
              "imageAlt": "Riscos operacionais"
            }
          ],
          "transcript": "Riscos estruturais e operacionais."
        },
        {
          "id": "m4-riscos-2",
          "type": "content",
          "kicker": "📄 Texto",
          "title": "Riscos Específicos da Edificação",
          "cardAspect": "square",
          "cards": [
            {
              "title": "Ambientais",
              "body": "Calor, ventilação inadequada, poeiras combustíveis.",
              "image": "assets/fotos/m4-ambientais.png",
              "imageAlt": "Riscos ambientais"
            },
            {
              "title": "Humanos",
              "body": "Falta de treinamento, negligência, uso incorreto de EPIs.",
              "image": "assets/fotos/m4-humanos.png",
              "imageAlt": "Riscos humanos"
            }
          ],
          "transcript": "Riscos ambientais e humanos."
        },
        {
          "id": "m4-prevenir-brigada",
          "type": "content",
          "kicker": "📄 Texto",
          "title": "Prevenir e o Papel da Brigada",
          "skin": "actions",
          "cards": [
            {
              "icon": "🛡️",
              "tone": "prevent",
              "title": "Prevenir",
              "lead": "Antes do fogo começar",
              "points": [
                { "icon": "🗺️", "text": "Mapear setores de risco" },
                { "icon": "🔍", "text": "Fazer inspeções periódicas" },
                { "icon": "🛢️", "text": "Armazenar inflamáveis corretamente" },
                { "icon": "⚡", "text": "Manter a elétrica em dia" },
                { "icon": "🧯", "text": "Conhecer extintores, hidrantes e saídas" },
                { "icon": "🏃", "text": "Treinar e simular evacuação" }
              ]
            },
            {
              "icon": "👷",
              "tone": "role",
              "title": "Papel do brigadista",
              "lead": "Quando a emergência chega",
              "points": [
                { "icon": "🚨", "text": "Agir primeiro, com segurança" },
                { "icon": "🔎", "text": "Identificar causas potenciais" },
                { "icon": "🛠️", "text": "Inspecionar áreas e equipamentos" },
                { "icon": "📋", "text": "Monitorar o cumprimento das normas" },
                { "icon": "📢", "text": "Comunicar irregularidades ao superior" }
              ]
            }
          ],
          "transcript": "Prevenir riscos e o papel do brigadista."
        },
        {
          "id": "m4-cmp-fios",
          "type": "compare",
          "title": "Certo × errado: fios elétricos",
          "open": true,
          "compare": [
            {
              "ok": true,
              "label": "✓ Correto",
              "image": "assets/fotos/certo.png",
              "imageAlt": "Cabos organizados e à vista",
              "text": "Cabos organizados e à vista, longe de tapetes e de passagem."
            },
            {
              "ok": false,
              "label": "✕ Evitar",
              "image": "assets/fotos/errado.png",
              "imageAlt": "Fio da cafeteira sob o tapete",
              "text": "Fio sob o tapete esquenta sem ninguém ver e pode iniciar um incêndio."
            }
          ],
          "transcript": "Certo ou errado: fios elétricos."
        },
        {
          "id": "m4-cmp-tomadas",
          "type": "compare",
          "title": "Certo × errado: tomadas",
          "open": true,
          "compare": [
            {
              "ok": true,
              "label": "✓ Correto",
              "image": "assets/fotos/certop41.png",
              "imageAlt": "Cada aparelho na sua tomada",
              "text": "Cada aparelho na sua tomada. Ao fim do expediente, desligue o que não está em uso."
            },
            {
              "ok": false,
              "label": "✕ Evitar",
              "image": "assets/fotos/erradop41.png",
              "imageAlt": "Vários aparelhos num plugue em T",
              "text": "Vários aparelhos num plugue em T sobrecarregam a tomada e podem causar curto-circuito."
            }
          ],
          "transcript": "Certo ou errado: tomadas."
        },
        {
          "id": "m4-cmp-gas",
          "type": "compare",
          "title": "Certo × errado: cheiro de gás",
          "open": true,
          "compare": [
            {
              "ok": true,
              "label": "✓ Correto",
              "image": "assets/fotos/certop42.png",
              "imageAlt": "Abrir janelas e portas para ventilar",
              "text": "Abra janelas e portas para ventilar, sem acionar nenhum interruptor."
            },
            {
              "ok": false,
              "label": "✕ Evitar",
              "image": "assets/fotos/erradop42.png",
              "imageAlt": "Acender um fósforo para achar o vazamento",
              "text": "Não acenda fósforo nem mexa em interruptores — a faísca pode provocar explosão."
            }
          ],
          "transcript": "Certo ou errado: cheiro de gás."
        },
        {
          "id": "m4-quiz-intro",
          "type": "quiz-intro",
          "title": "Desafio — Caça ao Risco",
          "count": 4,
          "minCorrect": 3,
          "icon": "🔎",
          "body": "Identifique os riscos escondidos na cena (copa/reunião). A isca (extintor correto) <strong>não</strong> é risco. Mínimo de <strong>3 acertos</strong>.",
          "transcript": "Desafio do módulo 4: Caça ao Risco."
        },
        {
          "id": "m4-q1",
          "type": "question",
          "variant": "cartoes",
          "question": "Na copa: várias tomadas ligadas num único plugue em T atrás do micro-ondas. Isso é…",
          "alternatives": [
            {
              "id": "a",
              "text": "Risco — sobrecarga elétrica",
              "correct": true
            },
            {
              "id": "b",
              "text": "Situação segura e normal",
              "correct": false
            },
            {
              "id": "c",
              "text": "Isca — não é risco",
              "correct": false
            }
          ],
          "explanation": "Plugue em T sobrecarrega a tomada — risco real.",
          "review": "Plugue em T na copa",
          "transcript": "Na copa: várias tomadas ligadas num único plugue em T atrás do micro-ondas. Isso é…",
          "image": "assets/fotos/m4p1.png",
          "imageAlt": "Várias tomadas ligadas num plugue em T atrás do micro-ondas"
        },
        {
          "id": "m4-q2",
          "type": "question",
          "variant": "cartoes",
          "question": "Fio da cafeteira passando por baixo de um tapete. Isso é…",
          "alternatives": [
            {
              "id": "a",
              "text": "Risco — fio coberto / aquecimento",
              "correct": true
            },
            {
              "id": "b",
              "text": "Organização correta de cabos",
              "correct": false
            },
            {
              "id": "c",
              "text": "Isca — não é risco",
              "correct": false
            }
          ],
          "explanation": "Não se deve cobrir fios elétricos com tapetes.",
          "review": "Fio sob o tapete",
          "transcript": "Fio da cafeteira passando por baixo de um tapete. Isso é…",
          "image": "assets/fotos/m4p2.png",
          "imageAlt": "Fio da cafeteira passando por baixo de um tapete"
        },
        {
          "id": "m4-q3",
          "type": "question",
          "variant": "cartoes",
          "question": "Extintor de PQS fixado na parede, com o pino no lugar. Isso é…",
          "alternatives": [
            {
              "id": "a",
              "text": "Risco — precisa remover",
              "correct": false
            },
            {
              "id": "b",
              "text": "Isca — está correto, não é risco",
              "correct": true
            },
            {
              "id": "c",
              "text": "Risco — falta sinalização",
              "correct": false
            }
          ],
          "explanation": "Extintor instalado corretamente é isca — não clique como risco.",
          "review": "Extintor correto (isca)",
          "transcript": "Extintor de PQS fixado na parede, com o pino no lugar. Isso é…",
          "image": "assets/fotos/m4p3.png",
          "imageAlt": "Extintor de pó químico seco fixado na parede, com o pino no lugar"
        },
        {
          "id": "m4-q4",
          "type": "question",
          "variant": "cartoes",
          "question": "Caixas de papelão empilhadas encostadas no quadro de distribuição elétrica. Isso é…",
          "alternatives": [
            {
              "id": "a",
              "text": "Risco — combustível junto à elétrica",
              "correct": true
            },
            {
              "id": "b",
              "text": "Armazenamento adequado",
              "correct": false
            },
            {
              "id": "c",
              "text": "Isca — não é risco",
              "correct": false
            }
          ],
          "explanation": "Material combustível junto ao quadro elétrico é risco grave.",
          "review": "Caixas no quadro elétrico",
          "transcript": "Caixas de papelão empilhadas encostadas no quadro de distribuição elétrica. Isso é…",
          "image": "assets/fotos/m4p4.png",
          "imageAlt": "Caixas de papelão empilhadas encostadas no quadro elétrico"
        }
      ]
    },
    {
      "id": 5,
      "title": "Psicologia em Emergências",
      "meta": "Vídeos + texto · Reconheça a reação + desafio Guerra de Palpites",
      "titleUnlock": {
        "title": "LÍDER SERENO",
        "body": "Você reconhece reações e lidera com calma.",
        "icon": "🧠"
      },
      "screens": [
        {
          "id": "m5-cover",
          "type": "cover",
          "title": "Módulo 5 — Psicologia em Emergências",
          "subtitle": "Comportamento humano, reações ao perigo e liderança do brigadista.",
          "transcript": "Módulo 5: Psicologia em Emergências.",
          "image": "assets/fotos/capa-modulo5.png",
          "imageAlt": "Capa do módulo 5: psicologia em emergências"
        },
        {
          "id": "m5-v-porque",
          "type": "video",
          "kicker": "🎥 Vídeo",
          "title": "Por Que Falar de Psicologia em Emergência?",
          "duration": "0:35",
          "embed": "https://player-vz-d35edf2a-8e7.tv.pandavideo.com.br/embed/?v=02e9a463-3588-4b60-af48-2936299c4208",
          "playerId": "panda-02e9a463-3588-4b60-af48-2936299c4208",
          "scene": "Brigadista observando o open space com calma",
          "brief": "Preparação técnica e emocional para manter a calma, orientar e liderar.",
          "body": "Emergências provocam medo, estresse e reações instintivas. O comportamento humano impacta combate, evacuação e primeiros socorros. O brigadista precisa estar preparado técnica e emocionalmente.",
          "transcript": "Vídeo: por que falar de psicologia em emergência."
        },
        {
          "id": "m5-v-reacoes",
          "type": "video",
          "kicker": "🎥 Vídeo",
          "title": "Reações Psicológicas: Medo, Pânico e Paralisia",
          "duration": "1:15",
          "embed": "https://player-vz-d35edf2a-8e7.tv.pandavideo.com.br/embed/?v=1b8232e1-30c0-4b13-bfcb-1564808fc05d",
          "playerId": "panda-1b8232e1-30c0-4b13-bfcb-1564808fc05d",
          "scene": "Animação Pixar das reações",
          "brief": "Negação, paralisia, pânico, obediência cega, histeria coletiva e heroísmo.",
          "body": "Conceitos: emergência, estresse, pânico e resiliência. Reações: negação, paralisia, pânico, obediência cega, histeria coletiva e heroísmo. Reconhecer é o primeiro passo para agir.",
          "transcript": "Vídeo: reações psicológicas em emergência."
        },
        {
          "id": "m5-v-lideranca",
          "type": "video",
          "kicker": "🎥 Vídeo",
          "title": "O Papel e a Liderança do Brigadista em Momentos de Crise",
          "duration": "1:20",
          "embed": "https://player-vz-d35edf2a-8e7.tv.pandavideo.com.br/embed/?v=59365249-1853-4a68-a21d-e3f8019d0db9",
          "playerId": "panda-59365249-1853-4a68-a21d-e3f8019d0db9",
          "scene": "Simulação de apoio emocional entre colegas",
          "brief": "Referência de calma: respiração guiada, contato visual, comandos simples, sem agressividade.",
          "body": "Pessoas seguem quem demonstra controle. Técnicas: respiração guiada, contato visual/verbal, comandos simples e diretos, evitar confrontos. Identificar colapso emocional evita o caos.",
          "transcript": "Vídeo: liderança do brigadista em crise."
        },
        {
          "id": "m5-cuidado",
          "type": "content",
          "kicker": "📄 Texto",
          "title": "Cuidando de Quem Cuida: Saúde Emocional do Brigadista",
          "items": [
            {
              "icon": "🧭",
              "text": "Reconhecer os próprios limites emocionais"
            },
            {
              "icon": "🧘",
              "text": "Controlar o estresse, manter o foco e a calma"
            },
            {
              "icon": "🤝",
              "text": "Buscar apoio psicológico após eventos críticos"
            }
          ],
          "quote": "Liderar em crise tem custo emocional real — reconhecer isso não é fraqueza, é preparo.",
          "transcript": "Saúde emocional do próprio brigadista."
        },
        {
          "id": "m5-refl-paralisia",
          "type": "reflect",
          "title": "Reconheça a reação",
          "prompt": "Durante o alarme, um colega para no meio do corredor e não consegue decidir nem se mover.",
          "promptAccent": "Que reação é essa?",
          "choices": [
            {
              "icon": "🙅",
              "text": "Negação",
              "correct": false
            },
            {
              "icon": "🧊",
              "text": "Paralisia",
              "correct": true
            },
            {
              "icon": "🏃",
              "text": "Pânico",
              "correct": false
            }
          ],
          "answer": "É a paralisia: a pessoa fica incapaz de tomar decisões ou de se mover. Aproxime-se com calma, mantenha contato visual e use comandos simples e diretos.",
          "transcript": "Reconheça a reação: um colega paralisado no corredor."
        },
        {
          "id": "m5-refl-negacao",
          "type": "reflect",
          "title": "Reconheça a reação",
          "prompt": "Um colega diz “deve ser só um teste” e continua na mesa, ignorando o alarme.",
          "promptAccent": "Que reação é essa?",
          "choices": [
            {
              "icon": "🙈",
              "text": "Negação",
              "correct": true
            },
            {
              "icon": "🐑",
              "text": "Obediência cega",
              "correct": false
            },
            {
              "icon": "😱",
              "text": "Histeria coletiva",
              "correct": false
            }
          ],
          "answer": "É a negação: a pessoa se recusa a acreditar na gravidade da situação. Fale de forma clara e direta, sem discutir nem impor ordens com agressividade, e conduza-a à saída.",
          "transcript": "Reconheça a reação: um colega que ignora o alarme."
        },
        {
          "id": "m5-quiz-intro",
          "type": "quiz-intro",
          "title": "Desafio — Guerra de Palpites",
          "count": 4,
          "minCorrect": 3,
          "icon": "🗳️",
          "body": "Verdadeiro ou falso. Mínimo de <strong>3 acertos</strong>. (Uma rodada era bônus 2× no roteiro.)",
          "transcript": "Desafio do módulo 5: Guerra de Palpites."
        },
        {
          "id": "m5-q1",
          "type": "question",
          "variant": "duelo",
          "question": "O pânico é sempre a pior reação possível numa emergência e deve ser eliminado a qualquer custo.",
          "alternatives": [
            {
              "id": "a",
              "text": "Verdadeiro",
              "correct": false
            },
            {
              "id": "b",
              "text": "Falso",
              "correct": true
            }
          ],
          "explanation": "Pânico é uma reação intensa e desorganizada — o foco é reconhecê-la e conter com calma, não “eliminar a qualquer custo”.",
          "review": "Afirmativa sobre pânico",
          "transcript": "O pânico é sempre a pior reação possível numa emergência e deve ser eliminado a qualquer custo.",
          "image": "assets/fotos/m5-p1.png",
          "imageAlt": "Cena ilustrando reação de pânico em emergência"
        },
        {
          "id": "m5-q2",
          "type": "question",
          "variant": "duelo",
          "question": "Um brigadista calmo pode evitar o pânico se espalhar entre as outras pessoas.",
          "alternatives": [
            {
              "id": "a",
              "text": "Verdadeiro",
              "correct": true
            },
            {
              "id": "b",
              "text": "Falso",
              "correct": false
            }
          ],
          "explanation": "Pessoas tendem a seguir quem demonstra controle e calma.",
          "review": "Calma do brigadista",
          "transcript": "Um brigadista calmo pode evitar o pânico se espalhar entre as outras pessoas.",
          "image": "assets/fotos/m5-p2.png",
          "imageAlt": "Brigadista calmo orientando outras pessoas"
        },
        {
          "id": "m5-q3",
          "type": "question",
          "variant": "duelo",
          "question": "A obediência cega, seguir ordens sem questionar, é sempre uma reação positiva numa emergência.",
          "alternatives": [
            {
              "id": "a",
              "text": "Verdadeiro",
              "correct": false
            },
            {
              "id": "b",
              "text": "Falso",
              "correct": true
            }
          ],
          "explanation": "Obediência cega é uma reação possível — não é sempre positiva; o brigadista precisa de comunicação clara e segura.",
          "review": "Obediência cega",
          "transcript": "A obediência cega, seguir ordens sem questionar, é sempre uma reação positiva numa emergência.",
          "image": "assets/fotos/m5-p3.png",
          "imageAlt": "Pessoas seguindo ordens em situação de emergência"
        },
        {
          "id": "m5-q4",
          "type": "question",
          "variant": "duelo",
          "question": "O brigadista também deve buscar apoio psicológico após viver um evento crítico.",
          "alternatives": [
            {
              "id": "a",
              "text": "Verdadeiro",
              "correct": true
            },
            {
              "id": "b",
              "text": "Falso",
              "correct": false
            }
          ],
          "explanation": "Cuidar de quem cuida faz parte do preparo.",
          "review": "Apoio psicológico após evento crítico",
          "transcript": "O brigadista também deve buscar apoio psicológico após viver um evento crítico.",
          "image": "assets/fotos/m5-p4.png",
          "imageAlt": "Brigadista buscando apoio após evento crítico"
        }
      ]
    },
    {
      "id": 6,
      "title": "Primeiros Socorros: Traumas e Emergências Clínicas",
      "meta": "Vídeos + ficha · desafio Corrente de Decisão",
      "titleUnlock": {
        "title": "PRIMEIRA RESPOSTA",
        "body": "Você sabe conduzir as emergências clínicas mais comuns.",
        "icon": "🩹"
      },
      "screens": [
        {
          "id": "m6-cover",
          "type": "cover",
          "title": "Módulo 6 — Primeiros Socorros",
          "subtitle": "Queimaduras, choque, hemorragia, desmaio, engasgo e convulsão.",
          "transcript": "Módulo 6: Primeiros Socorros — traumas e emergências clínicas.",
          "image": "assets/fotos/capa-modulo6.png",
          "imageAlt": "Capa do módulo 6: primeiros socorros"
        },
        {
          "id": "m6-v-intro",
          "type": "video",
          "kicker": "🎥 Vídeo",
          "title": "Primeiros Socorros: Você é a Primeira Resposta",
          "duration": "0:35",
          "embed": "https://player-vz-d35edf2a-8e7.tv.pandavideo.com.br/embed/?v=36b10970-e9af-465a-8602-7cb065262ed6",
          "playerId": "panda-36b10970-e9af-465a-8602-7cb065262ed6",
          "scene": "Brigadista organizando kit de primeiros socorros",
          "brief": "Procedimentos simples e imediatos até o atendimento especializado — não é atendimento médico.",
          "body": "Primeiros socorros são procedimentos simples e imediatos no local do acidente ou mal súbito, até o atendimento especializado. Não é atendimento médico — mas salva vidas.",
          "transcript": "Vídeo: introdução aos primeiros socorros."
        },
        {
          "id": "m6-v-queimaduras",
          "type": "video",
          "kicker": "🎥 Vídeo",
          "title": "Queimaduras: Causas, Classificação e Conduta",
          "duration": "1:25",
          "embed": "https://player-vz-d35edf2a-8e7.tv.pandavideo.com.br/embed/?v=653c55b2-e6e4-43f8-a3e9-f62ef4187ced",
          "playerId": "panda-653c55b2-e6e4-43f8-a3e9-f62ef4187ced",
          "scene": "Animação das camadas da pele + conduta com pano úmido",
          "brief": "Graus 1–4; abafar/rolar; enxaguar químicos; cobrir úmido; nunca furar bolhas, gelo, pomada ou puxar roupa grudada.",
          "body": "Causas: físicas, químicas ou mecânicas. Graus: 1 eritema; 2 bolhas; 3 todas as camadas; 4 musculatura. Conduta: abafar/rolar; químicos → água corrente; cobrir com pano limpo e úmido; chamar socorro. Nunca: furar bolhas, gelo, pomadas, retirar roupa grudada.",
          "transcript": "Vídeo: queimaduras."
        },
        {
          "id": "m6-v-choque-hemorragia",
          "type": "video",
          "kicker": "🎥 Vídeo",
          "title": "Choque Elétrico e Hemorragias: Agindo Rápido",
          "duration": "1:25",
          "embed": "https://player-vz-d35edf2a-8e7.tv.pandavideo.com.br/embed/?v=a6325ac5-7971-42e4-bcb0-471d0e6dda95",
          "playerId": "panda-a6325ac5-7971-42e4-bcb0-471d0e6dda95",
          "scene": "Desligar energia antes do contato; curativo compressivo",
          "brief": "Choque: desligar energia → respiração/pulso → cobrir → SAMU. Hemorragia: compressão com gaze e socorro.",
          "body": "Choque: desligue a eletricidade antes de tocar; se não der, use material não condutor seco. Verifique respiração e pulso, cubra a área, chame o SAMU. Hemorragia: curativo compressivo e socorro imediato.",
          "transcript": "Vídeo: choque elétrico e hemorragias."
        },
        {
          "id": "m6-hemorragia-controle",
          "type": "content",
          "kicker": "📄 Texto",
          "steps": true,
          "stepUnit": "Passo",
          "stepNext": "Próximo passo",
          "stepFinish": "Concluir",
          "title": "Hemorragia: Como Controlar o Sangramento",
          "body": "Controle o sangramento externo nesta ordem — do mais urgente ao último recurso.",
          "items": [
            {
              "n": 1,
              "icon": "📞",
              "title": "Ligue para a emergência:",
              "text": "SAMU 192 ou Bombeiros 193, imediatamente.",
              "image": "assets/fotos/p65-1.png",
              "imageAlt": "Profissional de saúde ligando para emergência no celular"
            },
            {
              "n": 2,
              "icon": "🧤",
              "title": "Proteja-se:",
              "text": "use luvas descartáveis, se tiver, antes de tocar no sangue.",
              "image": "assets/fotos/p65-2.png",
              "imageAlt": "Uso de luvas descartáveis antes de tocar no sangue"
            },
            {
              "n": 3,
              "icon": "🩹",
              "title": "Comprima a ferida:",
              "text": "cubra com pano limpo, toalha ou gaze e pressione com firmeza por 10 a 20 minutos.",
              "image": "assets/fotos/p65-3.png",
              "imageAlt": "Compressão da ferida com gaze no braço do trabalhador"
            },
            {
              "n": 4,
              "icon": "🚫",
              "title": "Não retire panos encharcados:",
              "text": "se o sangue passar, coloque outro pano limpo por cima, sem tirar o primeiro.",
              "image": "assets/fotos/p65-4.png",
              "imageAlt": "Novo pano limpo colocado sobre o curativo encharcado, sem retirar o primeiro"
            },
            {
              "n": 5,
              "icon": "⬆️",
              "title": "Eleve o membro:",
              "text": "braço ou perna acima do nível do coração, se não houver suspeita de fratura grave.",
              "image": "assets/fotos/p65-5.png",
              "imageAlt": "Elevação do membro ferido acima do nível do coração"
            },
            {
              "n": 6,
              "icon": "⚠️",
              "title": "Torniquete como último recurso:",
              "text": "só se a pressão direta não for suficiente num sangramento grave em membro.",
              "warn": "Último recurso — só em sangramento grave de membro.",
              "image": "assets/fotos/p65-6.png",
              "imageAlt": "Aplicação de torniquete no braço como último recurso"
            }
          ],
          "review": "Como controlar hemorragia externa",
          "transcript": "Hemorragia: como controlar o sangramento externo."
        },
        {
          "id": "m6-hemorragia-torniquete",
          "type": "content",
          "kicker": "📄 Texto",
          "steps": true,
          "stepUnit": "Passo",
          "stepNext": "Próximo passo",
          "stepFinish": "Concluir",
          "title": "Torniquete: Passo a Passo",
          "body": "Só use o torniquete quando a pressão direta não for suficiente para parar o sangramento.",
          "items": [
            {
              "n": 1,
              "icon": "📍",
              "title": "Posicione:",
              "text": "5 a 7 cm acima da ferida, na direção do tronco. Nunca sobre uma articulação; sem saber o local exato, coloque o mais alto possível no membro.",
              "image": "assets/fotos/p66-1.png",
              "imageAlt": "Posicionamento do torniquete acima da ferida"
            },
            {
              "n": 2,
              "icon": "🔒",
              "title": "Ajuste:",
              "text": "passe a fita ao redor do membro e puxe o velcro com firmeza, sem folga nenhuma.",
              "image": "assets/fotos/p66-2.png",
              "imageAlt": "Ajuste firme da fita do torniquete no membro"
            },
            {
              "n": 3,
              "icon": "🔄",
              "title": "Torça:",
              "text": "gire a barra de torção até o sangramento parar totalmente e o pulso sumir. Dói bastante, mas é necessário.",
              "image": "assets/fotos/p66-3.png",
              "imageAlt": "Torção da barra do torniquete até estancar o sangramento"
            },
            {
              "n": 4,
              "icon": "🧷",
              "title": "Trave:",
              "text": "prenda a barra no clipe de fixação e cubra com a tira de segurança.",
              "image": "assets/fotos/p66-4.png",
              "imageAlt": "Barra do torniquete travada no clipe de fixação"
            },
            {
              "n": 5,
              "icon": "🕒",
              "title": "Anote o horário:",
              "text": "registre a hora exata da aplicação, no próprio torniquete ou num papel visível na vítima.",
              "image": "assets/fotos/p66-5.png",
              "imageAlt": "Registro do horário de aplicação do torniquete"
            },
            {
              "n": 6,
              "icon": "⛔",
              "title": "Nunca afrouxe:",
              "text": "só uma equipe médica no hospital pode remover o torniquete.",
              "warn": "Não afrouxe nem remova — só a equipe médica no hospital.",
              "image": "assets/fotos/p66-6.jpeg",
              "imageAlt": "Torniquete mantido no lugar até o atendimento hospitalar"
            }
          ],
          "review": "Como aplicar um torniquete",
          "transcript": "Torniquete: passo a passo de aplicação."
        },
        {
          "id": "m6-v-desmaio-engasgo",
          "type": "video",
          "kicker": "🎥 Vídeo",
          "title": "Desmaio e Engasgo (Adulto e Bebê)",
          "duration": "1:30",
          "embed": "https://player-vz-d35edf2a-8e7.tv.pandavideo.com.br/embed/?v=d0d81cb8-3942-424e-b275-1eb08ccecd49",
          "playerId": "panda-d0d81cb8-3942-424e-b275-1eb08ccecd49",
          "scene": "Posição de recuperação; Heimlich; manequim infantil",
          "brief": "Desmaio: arejado, pernas elevadas. Adulto: tosse → Heimlich → SAMU/RCP. Bebê: bruços no antebraço + palmadas nas costas.",
          "body": "Desmaio: local arejado, deitar de costas com pernas elevadas, afrouxar roupas, água após recuperar. Engasgo adulto: tossir → Heimlich → SAMU → RCP se necessário. Bebê: bruços no antebraço, palmadas leves nas costas (manequim no vídeo).",
          "transcript": "Vídeo: desmaio e engasgo."
        },
        {
          "id": "m6-engasgo-criancas-adultos",
          "type": "content",
          "kicker": "📄 Texto",
          "title": "Engasgo em Crianças (+1 ano) e Adultos",
          "body": "A sequência certa alterna pancadas nas costas com compressões abdominais.",
          "items": [
            { "n": 1, "title": "Posicione-se:", "text": "atrás da vítima." },
            { "n": 2, "title": "5 pancadas nas costas:", "text": "golpes firmes entre as escápulas." },
            { "n": 3, "title": "Não saiu? Heimlich:", "text": "5 compressões abdominais." },
            { "n": 4, "title": "Repita:", "text": "até o objeto sair ou a pessoa desmaiar. Se desmaiar, inicie a RCP." }
          ],
          "review": "Engasgo em crianças e adultos: pancadas + Heimlich",
          "transcript": "Engasgo em crianças acima de um ano e adultos."
        },
        {
          "id": "m6-engasgo-criancas-adultos-foto",
          "type": "content",
          "layout": "stack",
          "kicker": "📷 Foto",
          "title": "Engasgo em Crianças (+1 ano) e Adultos",
          "image": "assets/fotos/p68.png",
          "imageAlt": "Infográfico da manobra Heimlich para desengasgar: posicionar-se atrás, fechar o punho, comprimir entre umbigo e tórax e empurrar para dentro e para cima",
          "imageFit": "contain",
          "review": "Manobra Heimlich para desengasgar",
          "transcript": "Infográfico: a manobra Heimlich para desengasgar."
        },
        {
          "id": "m6-engasgo-bebe",
          "type": "content",
          "kicker": "📄 Texto",
          "title": "Engasgo em Bebês (menos de 1 ano)",
          "items": [
            { "icon": "🚫", "title": "Proibido:", "text": "compressão abdominal em bebês — o risco de ferir os órgãos internos é grande." },
            { "n": 1, "title": "De bruços no antebraço:", "text": "cabeça mais baixa que o corpo, e 5 pancadas firmes nas costas." },
            { "n": 2, "title": "Vire de barriga para cima:", "text": "5 compressões torácicas no centro do peito, com a base da mão." },
            { "n": 3, "title": "Alterne os ciclos:", "text": "até o bebê expelir o objeto ou perder a consciência." }
          ],
          "review": "Engasgo em bebês: pancadas + compressões torácicas",
          "transcript": "Engasgo em bebês com menos de um ano."
        },
        {
          "id": "m6-engasgo-bebe-foto",
          "type": "content",
          "layout": "stack",
          "kicker": "📷 Foto",
          "title": "Engasgo em Bebês (menos de 1 ano)",
          "image": "assets/fotos/pg71.png",
          "imageAlt": "Infográfico de desengasgo em bebês: bruços no antebraço com palmadas nas costas, verificar respiração, chamar SAMU 192 e iniciar RCP se necessário",
          "imageFit": "contain",
          "review": "Desengasgo em bebês",
          "transcript": "Infográfico: desengasgo em bebês."
        },
        {
          "id": "m6-v-convulsao",
          "type": "video",
          "kicker": "🎥 Vídeo",
          "title": "Convulsão: Cuidados e Como Proteger a Vítima",
          "duration": "0:50",
          "embed": "https://player-vz-d35edf2a-8e7.tv.pandavideo.com.br/embed/?v=4d8c6cfe-a1a8-45a5-b3f7-75ac69cc11aa",
          "playerId": "panda-4d8c6cfe-a1a8-45a5-b3f7-75ac69cc11aa",
          "scene": "Proteger cabeça, afastar objetos, pano entre os dentes com cuidado",
          "brief": "Não dar medicação/líquido/alimento; não deixar sozinha; chamar SAMU.",
          "body": "Deite no chão, afaste objetos, proteja a cabeça inclinada lateralmente, coloque pano entre os dentes com cuidado, chame o SAMU. Nunca medicação, líquido ou alimento; nunca deixe sozinha.",
          "transcript": "Vídeo: convulsão."
        },
        {
          "id": "m6-ficha",
          "type": "content",
          "kicker": "📄 Texto",
          "steps": true,
          "stepUnit": "Emergência",
          "stepNext": "Próxima emergência",
          "stepFinish": "Concluir ficha",
          "title": "Ficha Rápida: O Que Fazer em Cada Emergência",
          "items": [
            {
              "n": 1,
              "icon": "🔥",
              "title": "Queimaduras",
              "text": "Abafar/rolar; químico → água; cobrir úmido; socorro.",
              "warn": "Nunca furar bolhas, usar pomada ou puxar roupa grudada.",
              "tone": "e1",
              "image": "assets/fotos/queimaduras.png",
          "imageAlt": "Atendimento a queimadura"
            },
            {
              "n": 2,
              "icon": "⚡",
              "title": "Choque elétrico",
              "text": "Desligar energia primeiro; checar respiração/pulso; cobrir; SAMU.",
              "tone": "e2",
              "image": "assets/fotos/choque.png",
          "imageAlt": "Atendimento a choque elétrico"
            },
            {
              "n": 3,
              "icon": "🩸",
              "title": "Hemorragia",
              "text": "Curativo compressivo; chamar socorro.",
              "tone": "e3",
              "image": "assets/fotos/hemorragia.png",
          "imageAlt": "Controle de hemorragia"
            },
            {
              "n": 4,
              "icon": "😵",
              "title": "Desmaio",
              "text": "Local arejado; deitar com pernas elevadas; afrouxar roupas.",
              "tone": "e4",
              "image": "assets/fotos/desmaio.png",
          "imageAlt": "Atendimento a desmaio"
            },
            {
              "n": 5,
              "icon": "🫁",
              "title": "Engasgo adulto",
              "text": "Tosse → Heimlich → SAMU → RCP se necessário.",
              "tone": "e5",
              "image": "assets/fotos/engasgo-adulto.png",
          "imageAlt": "Manobra de desengasgo em adulto"
            },
            {
              "n": 6,
              "icon": "👶",
              "title": "Engasgo bebê",
              "text": "Bruços no antebraço + palmadas nas costas → SAMU → RCP se necessário.",
              "tone": "e6",
              "image": "assets/fotos/engasgo-bebe.png",
          "imageAlt": "Manobra de desengasgo em bebê"
            },
            {
              "n": 7,
              "icon": "🧠",
              "title": "Convulsão",
              "text": "Proteger a cabeça; afastar objetos; pano entre os dentes.",
              "warn": "Nunca medicação/líquido; nunca deixar sozinha.",
              "tone": "e7",
              "image": "assets/fotos/convulsao.png",
          "imageAlt": "Atendimento a convulsão"
            }
          ],
          "transcript": "Ficha rápida de conduta em cada emergência. Avance emergência por emergência."
        },
        {
          "id": "m6-quiz-intro",
          "type": "quiz-intro",
          "title": "Desafio — Corrente de Decisão",
          "count": 3,
          "minCorrect": 2,
          "icon": "⛓️",
          "body": "Cenário de choque elétrico: 3 decisões em sequência, e cada erro mostra a consequência. Mínimo de <strong>2 acertos</strong>.",
          "transcript": "Desafio do módulo 6: Corrente de Decisão."
        },
        {
          "id": "m6-q1",
          "type": "question",
          "variant": "confirmar",
          "question": "Decisão 1 de 3 · Colega caído perto de uma tomada, aparentemente após choque. O que fazer primeiro?",
          "alternatives": [
            {
              "id": "a",
              "text": "Desligar a energia elétrica antes de qualquer contato",
              "correct": true
            },
            {
              "id": "b",
              "text": "Puxar a vítima pelo braço para afastá-la da tomada",
              "correct": false
            }
          ],
          "explanation": "Se você puxar a vítima com a energia ligada, a corrente passa para você também. Desligue a eletricidade antes de qualquer contato.",
          "review": "Primeira decisão — choque elétrico",
          "transcript": "Decisão 1 de 3 · Colega caído perto de uma tomada, aparentemente após choque. O que fazer primeiro?",
          "image": "assets/fotos/m6-p1.png",
          "imageAlt": "Colega caído perto de uma tomada após choque elétrico"
        },
        {
          "id": "m6-q2",
          "type": "question",
          "variant": "confirmar",
          "question": "Decisão 2 de 3 · Energia desligada. Próximo passo?",
          "alternatives": [
            {
              "id": "a",
              "text": "Verificar a respiração e a pulsação da vítima",
              "correct": true
            },
            {
              "id": "b",
              "text": "Aplicar pomada na área da queimadura imediatamente",
              "correct": false
            }
          ],
          "explanation": "Pomadas em queimaduras podem piorar a lesão — a orientação nunca é essa. Primeiro, verifique a respiração e a pulsação.",
          "review": "Segunda decisão — avaliação",
          "transcript": "Decisão 2 de 3 · Energia desligada. Próximo passo?",
          "image": "assets/fotos/m6-p2.png",
          "imageAlt": "Energia desligada, pronto para o próximo passo do atendimento"
        },
        {
          "id": "m6-q3",
          "type": "question",
          "variant": "confirmar",
          "question": "Decisão 3 de 3 · Vítima respirando, com queimadura visível no braço. Ação final?",
          "alternatives": [
            {
              "id": "a",
              "text": "Cobrir com compressa limpa e úmida e chamar o SAMU",
              "correct": true
            },
            {
              "id": "b",
              "text": "Colocar gelo diretamente sobre a queimadura",
              "correct": false
            }
          ],
          "explanation": "Gelo direto na lesão agrava o dano nos tecidos — nunca aplique. Cubra com compressa limpa e úmida e chame o SAMU.",
          "review": "Terceira decisão — conduta final",
          "transcript": "Decisão 3 de 3 · Vítima respirando, com queimadura visível no braço. Ação final?",
          "image": "assets/fotos/m6-p3.png",
          "imageAlt": "Vítima respirando com queimadura visível no braço"
        }
      ]
    },
    {
      "id": 7,
      "title": "RCP, Infarto e Encerramento",
      "meta": "Vídeos + números · Roleta da RCP + certificado",
      "titleUnlock": {
        "title": "PRONTO PARA AGIR",
        "body": "Você reconhece AVC/infarto, sabe a RCP e quem ligar.",
        "icon": "❤️"
      },
      "screens": [
        {
          "id": "m7-cover",
          "type": "cover",
          "title": "Módulo 7 — RCP, Infarto e Encerramento",
          "subtitle": "AVC, infarto, passo a passo da RCP, números de emergência e certificado.",
          "transcript": "Módulo 7: RCP, infarto e encerramento.",
          "image": "assets/fotos/capa-modulo7.png",
          "imageAlt": "Capa do módulo 7: RCP, infarto e encerramento"
        },
        {
          "id": "m7-v-avc-infarto",
          "type": "video",
          "kicker": "🎥 Vídeo",
          "title": "Reconhecendo o AVC e o Infarto",
          "duration": "1:30",
          "embed": "https://player-vz-d35edf2a-8e7.tv.pandavideo.com.br/embed/?v=edb28361-0ffe-4dc0-b6b4-189e7127c048",
          "playerId": "panda-edb28361-0ffe-4dc0-b6b4-189e7127c048",
          "scene": "Sinais observáveis + animação de vaso bloqueado",
          "brief": "AVC: face/membros, fala, visão, dor de cabeça. Infarto: dor no peito irradiando. Conduta: acalmar, não deixar só, SAMU.",
          "body": "AVC: entupimento ou rompimento de vaso no cérebro — perda de força, fala, visão, cefaleia súbita, vertigem. Infarto: fluxo bloqueado no coração — dor no peito irradiando, ansiedade, sudorese. Em ambos: acalme, não deixe sozinha, chame o SAMU.",
          "transcript": "Vídeo: reconhecendo AVC e infarto."
        },
        {
          "id": "m7-v-rcp",
          "type": "video",
          "kicker": "🎥 Vídeo",
          "title": "RCP: O Passo a Passo Que Salva Vidas",
          "duration": "1:30",
          "embed": "https://player-vz-d35edf2a-8e7.tv.pandavideo.com.br/embed/?v=08a5d2a9-7776-46b9-9e0a-518c0f81145f",
          "playerId": "panda-08a5d2a9-7776-46b9-9e0a-518c0f81145f",
          "scene": "Demonstração em manequim de treinamento",
          "brief": "Responsividade → vias aéreas → respiração/pulso (≤10 s) → chamar 192/193 → compressões.",
          "body": "PCR: interrupção abrupta de batimentos e respiração com perda de consciência. Avalie responsividade, abra vias aéreas, veja/ouça/sinta até 10 s, chame ajuda (192/193) e inicie compressões torácicas em superfície rígida, braços a 90°.",
          "transcript": "Vídeo: RCP passo a passo."
        },
        {
          "id": "m7-rcp-antes",
          "type": "content",
          "layout": "stack",
          "kicker": "📷 Foto",
          "title": "RCP: Antes de Começar",
          "image": "assets/fotos/pagina81.png",
          "imageFit": "contain",
          "items": [
            { "n": 1, "title": "Verifique o local:", "text": "o ambiente precisa ser seguro pra você e pra vítima." },
            { "n": 2, "title": "Cheque a resposta:", "text": "toque nos ombros e pergunte em voz alta se ela está bem." },
            { "n": 3, "title": "Chame ajuda:", "text": "192 (SAMU), e peça um DEA se houver um por perto." },
            { "n": 4, "title": "Observe a respiração:", "text": "o tórax se move? Por no máximo 10 segundos." },
            { "n": 5, "title": "Posicione a vítima:", "text": "de barriga para cima, sobre uma superfície firme e plana." }
          ],
          "review": "Antes de começar a RCP",
          "transcript": "RCP: os passos antes de iniciar as compressões."
        },
        {
          "id": "m7-rcp-compressoes",
          "type": "content",
          "layout": "stack",
          "kicker": "📷 Foto",
          "title": "RCP: Como Fazer as Compressões",
          "image": "assets/fotos/pagina82.jpeg",
          "imageFit": "contain",
          "items": [
            { "n": 1, "title": "Posição das mãos:", "text": "ajoelhado ao lado da vítima, uma mão sobre a outra, dedos entrelaçados, no centro do peito." },
            { "n": 2, "title": "Postura:", "text": "braços esticados, use o peso do corpo, ângulo de 90° com o tórax." },
            { "n": 3, "title": "Frequência:", "text": "100 a 120 compressões por minuto, no ritmo de \"Stayin' Alive\", dos Bee Gees." },
            { "n": 4, "title": "Profundidade:", "text": "pelo menos 5 a 6 cm em adultos." },
            { "n": 5, "title": "Retorno do tórax:", "text": "deixe o peito voltar à posição normal entre uma compressão e outra." }
          ],
          "review": "Como fazer as compressões da RCP",
          "transcript": "RCP: técnica correta das compressões torácicas."
        },
        {
          "id": "m7-numeros",
          "type": "content",
          "kicker": "📄 Texto",
          "title": "Números de Emergência: Saiba Quem Chamar",
          "stats": [
            { "num": "193", "label": "Bombeiros", "tone": "featured" },
            { "num": "199", "label": "Defesa Civil" },
            { "num": "194", "label": "Polícia Federal" },
            { "num": "192", "label": "SAMU" },
            { "num": "191", "label": "Polícia Rodoviária Federal" },
            { "num": "190", "label": "Polícia Militar" },
            { "num": "198 ou 191", "label": "Polícia Militar Rodoviária Estadual" },
            { "num": "8427 1052", "label": "Guarda Municipal" },
            { "num": "0800 643 5252", "label": "Centro de Informações Toxicológicas" }
          ],
          "transcript": "Números de emergência: Bombeiros 193, Defesa Civil 199, Polícia Federal 194, SAMU 192, Polícia Rodoviária Federal 191, Polícia Militar 190, Polícia Militar Rodoviária Estadual 198 ou 191, Guarda Municipal 8427 1052, e Centro de Informações Toxicológicas 0800 643 5252."
        },
        {
          "id": "m7-v-encerramento",
          "type": "video",
          "kicker": "🎥 Vídeo",
          "title": "Encerramento: Você Está Pronto",
          "duration": "0:30",
          "embed": "https://player-vz-d35edf2a-8e7.tv.pandavideo.com.br/embed/?v=4821065b-d6e7-4715-aa3e-3ce8cdf013d9",
          "playerId": "panda-4821065b-d6e7-4715-aa3e-3ce8cdf013d9",
          "scene": "Brigadista confiante no corredor + logo Coca-Cola",
          "brief": "Mensagem final e frase de fechamento do material NR 23.",
          "body": "Todos têm o direito de viver em um ambiente seguro, sem correr riscos desnecessários e sem receios de danos à sua saúde e vida. Você concluiu o NR 23 Intermediário — esteja sempre pronto.",
          "transcript": "Vídeo de encerramento."
        },
        {
          "id": "m7-quiz-intro",
          "type": "quiz-intro",
          "title": "Desafio — Roleta da RCP",
          "count": 2,
          "minCorrect": 2,
          "icon": "⚡",
          "body": "2 desafios: monte a <strong>sequência da RCP</strong> e depois toque no <strong>ritmo das compressões</strong>.",
          "transcript": "Desafio final: Roleta da RCP."
        },
        {
          "id": "m7-order-rcp",
          "type": "order",
          "kicker": "🔢 Roleta da RCP",
          "title": "Ordene as etapas da RCP",
          "body": "Toque nas etapas na ordem correta do procedimento.",
          "time": 30,
          "items": [
            {
              "key": "resp",
              "text": "Avaliar a responsividade — encostar e chamar alto",
              "rank": 0
            },
            {
              "key": "vias",
              "text": "Abrir as vias aéreas",
              "rank": 1
            },
            {
              "key": "pulso",
              "text": "Avaliar a respiração e o pulso (no máximo 10 segundos)",
              "rank": 2
            },
            {
              "key": "ajuda",
              "text": "Chamar ajuda — 192 (SAMU) ou 193 (Bombeiros)",
              "rank": 3
            },
            {
              "key": "comp",
              "text": "Iniciar as compressões torácicas",
              "rank": 4
            }
          ],
          "review": "Sequência correta da RCP",
          "transcript": "Ordene as 5 etapas da RCP."
        },
        {
          "id": "m7-rhythm",
          "type": "rhythm",
          "kicker": "🫀 Ritmo da compressão",
          "title": "Ritmo da compressão",
          "body": "Compressões de 100 a 120 por minuto. Acompanhe a pulsação e depois toque 8 vezes no mesmo ritmo.",
          "bpmMin": 100,
          "bpmMax": 120,
          "guideBpm": 110,
          "taps": 8,
          "tries": 5,
          "tolerance": 10,
          "review": "Ritmo das compressões torácicas",
          "transcript": "Toque no ritmo das compressões torácicas: de 100 a 120 por minuto."
        },
        {
          "id": "m7-finale",
          "type": "finale",
          "kicker": "🏆 Conclusão",
          "eyebrow": "Certificado de conclusão",
          "title": "Parabéns",
          "body": "Você concluiu o treinamento NR 23 – Proteção Contra Incêndios (Brigada de Incêndio - Nível Intermediário).",
          "quote": "Todos têm o direito de viver em um ambiente seguro, sem correr riscos desnecessários e sem receios de danos à sua saúde e vida.",
          "chips": [
            "NR 23",
            "Brigada de Incêndio",
            "Nível Intermediário"
          ],
          "transcript": "Parabéns. Você finalizou o NR 23, Proteção Contra Incêndios, Brigada de Incêndio, Nível Intermediário. Todos têm o direito de viver em um ambiente seguro.",
          "image": "assets/fotos/capafinal.png",
          "imageAlt": "Imagem final de parabéns pelo treinamento concluído"
        }
      ]
    }
  ]
};
