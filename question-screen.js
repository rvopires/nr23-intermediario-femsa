/**
 * QuestionScreen — componente reutilizável (vanilla JS)
 *
 * Tipos (JSON) — tudo DENTRO do cartão:
 *  - cover:    { type, title, subtitle?, image? }
 *  - content:  { type, kicker?, title, body?, bullets?, image?, cards?, stats?, items?, rules?, quote?, note?, compare? }
 *  - video:    { type, title, kicker?, duration?, scene?, brief?, video?, youtube?, image?/poster? }
 *  - image:    { type, title, kicker?, body?, bullets?, image, imageFit? }
 *  - quiz-intro: { type, title, body?, count?, minCorrect?, image? }
 *  - quiz-result: { type, passed, score, total, minCorrect, title?, titleUnlock? }
 *  - finale:   { type, title?, body?, eyebrow?, chips?, image?, kicker? }
 *  - reflect:  { type, prompt, answer, choices?[{icon,text,correct?}] }
 *  - compare:  { type, compare:[{ok,label,text}] }
 *  - order:    { type, items:[{key,text,rank}], time? }
 *  - match:    { type, pairs:[{ex,body}] }
 *  - question: { type, question, alternatives[2..4], explanation?, image?, opinion? }
 *
 * video: se tiver `video` (mp4) ou `youtube` (id/url), toca o player;
 *        senão mostra o placeholder "Vídeo a gravar" (como no treinamento).
 */
(function (global) {
  'use strict';

  /* Vídeo: não pode pular nada e o avanço libera faltando 8s */
  var VIDEO_UNLOCK_MARGIN = 8;
  var VIDEO_SEEK_TOLERANCE = 0.15;
  var VIDEO_TICK_TOLERANCE = 0.55;

  // "0:45", "1:20:05" ou "até 1:30" -> segundos (fallback se o player não informar a duração)
  function parseClock(txt) {
    var m = String(txt || '').match(/(?:(\d+):)?(\d{1,2}):(\d{2})/);
    if (!m) return 0;
    if (m[1] != null) return (Number(m[1]) * 3600) + (Number(m[2]) * 60) + Number(m[3]);
    return (Number(m[2]) * 60) + Number(m[3]);
  }

  function unlockThreshold(duration) {
    if (!(duration > 0)) return Infinity;
    return duration > VIDEO_UNLOCK_MARGIN ? duration - VIDEO_UNLOCK_MARGIN : duration * 0.85;
  }

  var sfxCtx = null;
  function ensureSfx() {
    var AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;
    if (!sfxCtx) sfxCtx = new AC();
    if (sfxCtx.state === 'suspended') {
      try { sfxCtx.resume(); } catch (e) {}
    }
    return sfxCtx;
  }

  var quizCorrectAudio = null;
  var quizWrongAudio = null;
  var QUIZ_CORRECT_SFX = encodeURI('assets/efeitos sonoros/correct-answer.mp3');
  var QUIZ_WRONG_SFX = encodeURI('assets/efeitos sonoros/OBJMisc-wrong_answer-Elevenlabs.mp3');

  function playQuizMp3(kind) {
    var isOk = kind === 'ok' || kind === 'correct';
    var src = isOk ? QUIZ_CORRECT_SFX : QUIZ_WRONG_SFX;
    try {
      ensureSfx();
      var audio = isOk ? quizCorrectAudio : quizWrongAudio;
      if (!audio) {
        audio = new Audio(src);
        audio.preload = 'auto';
        audio.volume = 0.45;
        if (isOk) quizCorrectAudio = audio;
        else quizWrongAudio = audio;
      }
      try {
        if (quizCorrectAudio && quizCorrectAudio !== audio) {
          quizCorrectAudio.pause();
          quizCorrectAudio.currentTime = 0;
        }
        if (quizWrongAudio && quizWrongAudio !== audio) {
          quizWrongAudio.pause();
          quizWrongAudio.currentTime = 0;
        }
      } catch (e) {}
      try {
        if (audio.readyState >= 1) audio.currentTime = 0;
      } catch (e2) {
        try { audio.load(); } catch (e3) {}
      }
      var p = audio.play();
      if (p && typeof p.then === 'function') {
        p.catch(function () { playBeepSynth(isOk ? 'ok' : 'nok'); });
      }
      return true;
    } catch (err) {
      return false;
    }
  }

  function playBeepSynth(type) {
    var ctx = ensureSfx();
    if (!ctx) return;
    try {
      var now = ctx.currentTime;
      function beepNote(freq, t, dur, vol, wave, slideTo) {
        var osc = ctx.createOscillator();
        var gain = ctx.createGain();
        osc.type = wave || 'sine';
        osc.frequency.setValueAtTime(freq, now + t);
        if (slideTo) osc.frequency.exponentialRampToValueAtTime(Math.max(40, slideTo), now + t + dur);
        gain.gain.setValueAtTime(0.0001, now + t);
        gain.gain.exponentialRampToValueAtTime(vol, now + t + 0.015);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + t + dur);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + t);
        osc.stop(now + t + dur + 0.02);
      }
      if (type === 'click' || type === 'flip') {
        beepNote(type === 'flip' ? 520 : 880, 0, 0.07, 0.08, 'sine', type === 'flip' ? 680 : 1240);
      } else if (type === 'ok' || type === 'correct') {
        beepNote(523.25, 0, 0.12, 0.16, 'sine');
        beepNote(659.25, 0.08, 0.12, 0.16, 'sine');
        beepNote(783.99, 0.16, 0.22, 0.16, 'sine');
      } else if (type === 'nok') {
        beepNote(320, 0, 0.28, 0.16, 'triangle', 140);
      } else if (type === 'tick') {
        beepNote(1000, 0, 0.035, 0.11, 'sine');   // guia do ritmo: estalo curto, mais grave que o "click"
      } else if (type === 'end') {
        beepNote(523.25, 0, 0.16, 0.18, 'triangle');
        beepNote(659.25, 0.1, 0.16, 0.18, 'triangle');
        beepNote(783.99, 0.2, 0.18, 0.18, 'triangle');
        beepNote(1046.5, 0.34, 0.4, 0.2, 'triangle');
      } else {
        beepNote(800, 0, 0.07, 0.08, 'sine', 1200);
      }
    } catch (e) {}
  }

  function playBeep(type) {
    if (type === 'ok' || type === 'correct' || type === 'nok') {
      if (playQuizMp3(type === 'correct' ? 'ok' : type)) return;
    }
    playBeepSynth(type);
  }
  global.playBeep = playBeep;
  if (typeof document !== 'undefined') {
    var unlockSfx = function () {
      ensureSfx();
      document.removeEventListener('pointerdown', unlockSfx, true);
      document.removeEventListener('keydown', unlockSfx, true);
    };
    document.addEventListener('pointerdown', unlockSfx, true);
    document.addEventListener('keydown', unlockSfx, true);
  }

  function beep(type) {
    try { playBeep(type); } catch (e) {}
  }

  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function youtubeId(raw) {
    if (!raw) return '';
    var s = String(raw);
    if (/^[\w-]{11}$/.test(s)) return s;
    var m = s.match(/(?:youtu\.be\/|v=|embed\/)([\w-]{11})/);
    return m ? m[1] : '';
  }

  var ZOOM_ICON = '<svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" focusable="false"><circle cx="10.5" cy="10.5" r="6" fill="none" stroke="currentColor" stroke-width="2.2"/><path d="M15.5 15.5L21 21" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg>';

  function zoomWrap(src, imgHtml) {
    if (!src) return imgHtml;
    return `<div class="qs-zoom-wrap">
      ${imgHtml}
      <button type="button" class="qs-zoom-btn" data-qs-zoom="${esc(src)}" aria-label="Ampliar imagem">${ZOOM_ICON}</button>
    </div>`;
  }

  function ensureLightbox() {
    if (document.getElementById('qs-lightbox')) return;
    var box = document.createElement('div');
    box.id = 'qs-lightbox';
    box.className = 'qs-lightbox';
    box.hidden = true;
    box.setAttribute('role', 'dialog');
    box.setAttribute('aria-modal', 'true');
    box.setAttribute('aria-label', 'Imagem ampliada');
    box.innerHTML = `<button type="button" class="qs-lightbox-close" data-qs-lightbox-close aria-label="Fechar">×</button>
      <img class="qs-lightbox-img" alt="">`;
    document.body.appendChild(box);
    box.addEventListener('click', function (e) {
      if (e.target === box || e.target.closest('[data-qs-lightbox-close]')) closeLightbox();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeLightbox();
    });
  }

  function openLightbox(src, alt) {
    if (!src) return;
    ensureLightbox();
    var box = document.getElementById('qs-lightbox');
    var img = box.querySelector('.qs-lightbox-img');
    img.src = src;
    img.alt = alt || '';
    box.hidden = false;
    document.documentElement.classList.add('qs-lightbox-open');
  }

  function closeLightbox() {
    var box = document.getElementById('qs-lightbox');
    if (!box || box.hidden) return;
    box.hidden = true;
    var img = box.querySelector('.qs-lightbox-img');
    if (img) img.removeAttribute('src');
    document.documentElement.classList.remove('qs-lightbox-open');
  }

  function mediaHTML(data, opts) {
    opts = opts || {};
    var fit = data.imageFit === 'contain' || opts.contain ? 'contain' : 'cover';
    if (data.image) {
      var pos = data.imagePosition || data.objectPosition || '';
      var posAttr = pos ? ` style="object-position:${esc(pos)}"` : '';
      var onErr = opts.noZoom
        ? `this.classList.add('is-broken');this.nextElementSibling&&this.nextElementSibling.classList.add('show');`
        : `this.classList.add('is-broken');var f=this.parentNode&&this.parentNode.querySelector('.qs-img-fallback');f&&f.classList.add('show');`;
      var img = `<img class="qs-img qs-img-${fit}" src="${esc(data.image)}" alt="${esc(data.imageAlt || data.title || '')}" loading="eager" decoding="async" fetchpriority="high"${posAttr} onerror="${onErr}">` +
        `<div class="qs-media-fallback qs-img-fallback" aria-hidden="true">${esc(data.icon || '🖼️')}</div>`;
      return opts.noZoom ? img : zoomWrap(data.image, img);
    }
    return `<div class="qs-media-fallback" aria-hidden="true">${esc(data.icon || '📘')}</div>`;
  }

  function pandaSrc(src) {
    var out = String(src || '');
    if (!out) return out;
    var sep = out.indexOf('?') === -1 ? '?' : '&';
    if (out.indexOf('saveProgress=') === -1) { out += sep + 'saveProgress=false'; sep = '&'; }
    if (out.indexOf('disableForward=') === -1) out += sep + 'disableForward=true';
    return out;
  }

  function playerHTML(data) {
    if (data.embed || data.panda) {
      var src = pandaSrc(data.embed || data.panda);
      var id = data.playerId || ('panda-' + Math.random().toString(36).slice(2, 10));
      return `<iframe id="${esc(id)}" class="qs-player qs-embed" data-qs-panda="1" src="${esc(src)}" title="${esc(data.title || 'Vídeo')}" allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture" allowfullscreen fetchpriority="high"></iframe>`;
    }
    if (data.video) {
      return `<video class="qs-player" controls playsinline preload="metadata" controlsList="nodownload noplaybackrate" disablepictureinpicture poster="${esc(data.poster || data.image || '')}" src="${esc(data.video)}"></video>`;
    }
    var yt = youtubeId(data.youtube);
    if (yt) {
      return `<iframe class="qs-player qs-yt" src="https://www.youtube.com/embed/${esc(yt)}?rel=0" title="${esc(data.title || 'Vídeo')}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
    }
    return '';
  }

  function videoHTML(data) {
    var live = playerHTML(data);
    var badge = data.duration ? `Vídeo a gravar · ${esc(data.duration)}` : 'Vídeo a gravar';
    if (data.video || data.youtube || data.embed || data.panda) {
      badge = data.duration ? `Vídeo · ${esc(data.duration)}` : 'Vídeo';
    }

    var stage = live
      ? `<div class="qs-video-stage">${live}</div>`
      : `<div class="qs-video-ph">
          <span class="qs-vbadge">${badge}</span>
          <div class="qs-vicon" aria-hidden="true">▶</div>
          <strong>${esc(data.scene || 'Cena a filmar')}</strong>
          <p>${esc(data.brief || data.body || '')}</p>
        </div>`;

    return `
      <article class="qs-screen is-video has-player" data-qs-root data-type="video">
        <header class="qs-video-head">
          <span class="qs-video-pill">${esc(data.kicker || '🎥 Vídeo')}</span>
          <h2 class="qs-video-title">${esc(data.title || '')}</h2>
        </header>
        <div class="qs-media qs-media-video">
          ${stage}
        </div>
      </article>`;
  }

  function imageHTML(data) {
    var bullets = Array.isArray(data.bullets) && data.bullets.length
      ? `<ul class="qs-bullets">${data.bullets.map(function (b) {
          return `<li>${esc(b)}</li>`;
        }).join('')}</ul>`
      : '';
    var body = data.body ? `<p class="qs-body">${esc(data.body)}</p>` : '';
    var stack = data.layout === 'stack';
    var media;
    if (Array.isArray(data.images) && data.images.length) {
      media = `<div class="qs-media qs-media-gallery count-${data.images.length}${stack ? ' qs-media-wide' : ' qs-media-split'}">${data.images.map(function (img) {
        var src = typeof img === 'string' ? img : (img.src || img.image || '');
        var alt = typeof img === 'string' ? (data.title || '') : (img.alt || img.imageAlt || data.title || '');
        var fit = (data.imageFit === 'contain') ? 'contain' : 'cover';
        var inner = `<img class="qs-img qs-img-${fit}" src="${esc(src)}" alt="${esc(alt)}" loading="eager" decoding="async">`;
        return zoomWrap(src, inner);
      }).join('')}</div>`;
    } else {
      media = `<div class="qs-media${stack ? ' qs-media-wide' : ' qs-media-split'}">${mediaHTML(data, { contain: data.imageFit === 'contain' })}</div>`;
    }
    if (stack) {
      return `
      <article class="qs-screen is-image is-stack" data-qs-root data-type="image">
        <div class="qs-panel qs-panel-stack">
          <h2 class="qs-title">${esc(data.title || '')}</h2>
          ${body}
          ${bullets}
        </div>
        ${media}
      </article>`;
    }
    return `
      <article class="qs-screen is-image has-split" data-qs-root data-type="image">
        ${media}
        <div class="qs-panel qs-panel-split">
          <h2 class="qs-title">${esc(data.title || '')}</h2>
          ${body}
          ${bullets}
        </div>
      </article>`;
  }

  function coverHTML(data) {
    return `
      <article class="qs-screen is-cover" data-qs-root data-type="cover">
        <div class="qs-media">
          ${mediaHTML(data, { noZoom: true })}
          <div class="qs-cover-labels">
            <h1>${esc(data.title || '')}</h1>
            ${data.subtitle ? `<p>${esc(data.subtitle)}</p>` : ''}
          </div>
        </div>
      </article>`;
  }

  function finaleHTML(data) {
    var chips = Array.isArray(data.chips) ? data.chips : [];
    var photo = data.image
      ? `<img class="qs-finale-photo" src="${esc(data.image)}" alt="" aria-hidden="true">`
      : '';
    var chipHtml = chips.map(function (c) {
      return `<span class="qs-finale-chip">${esc(c)}</span>`;
    }).join('');
    var quote = data.quote || data.motto || '';
    return `
      <article class="qs-screen is-finale" data-qs-root data-type="finale">
        ${photo}
        <div class="qs-finale-veil" aria-hidden="true"></div>
        <div class="qs-finale-glow" aria-hidden="true"></div>
        <div class="qs-finale-inner">
          ${data.kicker ? `<div class="qs-finale-kicker">${esc(data.kicker)}</div>` : ''}
          <div class="qs-finale-card medal-${esc(data.medalRank || 'none')}">
            <div class="qs-finale-shine" aria-hidden="true"></div>
            <div class="qs-finale-eyebrow">${esc(data.eyebrow || 'Certificado de conclusão')}</div>
            <div class="qs-finale-trophy" aria-hidden="true">${esc(data.medal || '🏆')}</div>
            ${data.medalName ? `<div class="qs-finale-medal-name">${esc(data.medalName)}</div>` : ''}
            <h2 class="qs-finale-title">${esc(data.title || 'Parabéns')}<span>!</span></h2>
            <div class="qs-finale-line" aria-hidden="true"></div>
            ${data.points != null ? `<div class="qs-finale-score">${esc(data.points)}<small> / ${esc(data.maxPoints != null ? data.maxPoints : '')} pts</small></div>` : ''}
            ${data.hits != null ? `<p class="qs-finale-hits">${esc(data.hits)} acertos em ${esc(data.questions != null ? data.questions : '')} questões</p>` : ''}
            <p class="qs-finale-body">${esc(data.body || data.subtitle || '')}</p>
            ${quote ? `<blockquote class="qs-finale-quote"><span aria-hidden="true">“</span>${esc(quote)}<span aria-hidden="true">”</span></blockquote>` : ''}
            ${chipHtml ? `<div class="qs-finale-chips">${chipHtml}</div>` : ''}
          </div>
        </div>
      </article>`;
  }

  function contentBlocks(data) {
    var html = '';
    if (data.body) html += `<p class="qs-body">${esc(data.body)}</p>`;
    if (Array.isArray(data.stats) && data.stats.length) {
      html += `<div class="qs-stats">${data.stats.map(function (s) {
        var tone = s.tone ? ' tone-' + esc(s.tone) : '';
        return `<div class="qs-stat${tone}">
          ${s.icon ? `<span class="qs-stat-ico" aria-hidden="true">${esc(s.icon)}</span>` : ''}
          <div class="qs-stat-lbl">${esc(s.label || '')}</div>
          <div class="qs-stat-num">${esc(s.num || '')}</div>
        </div>`;
      }).join('')}</div>`;
    }
    if (Array.isArray(data.cards) && data.cards.length) {
      var aspectClass = (data.cardAspect === 'landscape' || data.cardAspect === 'horizontal')
        ? ' is-landscape'
        : (data.cardAspect === 'square' || data.cardAspect === '1x1' ? ' is-square' : '');
      var skinClass = data.skin === 'actions' ? ' is-actions'
        : (data.skin === 'agents' ? ' is-agents' : '');
      html += `<div class="qs-cards count-${data.cards.length}${aspectClass}${skinClass}">${data.cards.map(function (c) {
        var imgOnly = !!(c.image && !c.title && !c.body && !c.icon && !(c.points && c.points.length));
        var img = c.image
          ? `<div class="qs-card-media">${zoomWrap(c.image, `<img class="qs-card-img" src="${esc(c.image)}" alt="${esc(c.imageAlt || c.title || '')}" loading="eager" decoding="async">`)}</div>`
          : '';
        var points = Array.isArray(c.points) && c.points.length
          ? `<ul class="qs-card-points">${c.points.map(function (p, pi) {
              var txt = typeof p === 'string' ? p : (p.text || p.label || '');
              var pico = typeof p === 'string' ? '' : (p.icon || '');
              return `<li>
                <span class="qs-point-num" aria-hidden="true">${pi + 1}</span>
                ${pico ? `<span class="qs-point-ico" aria-hidden="true">${esc(pico)}</span>` : ''}
                <span class="qs-point-txt">${esc(txt)}</span>
              </li>`;
            }).join('')}</ul>`
          : '';
        var tone = c.tone ? ' tone-' + esc(c.tone) : '';
        return `<article class="qs-card${c.image ? ' has-img' : ''}${imgOnly ? ' is-img-only' : ''}${points ? ' has-points' : ''}${tone}">
          ${img}
          <div class="qs-card-top">
            ${c.icon && !c.image ? `<div class="qs-card-ico" aria-hidden="true">${esc(c.icon)}</div>` : ''}
            <div class="qs-card-head">
              ${c.title ? `<h3>${esc(c.title)}</h3>` : ''}
              ${c.lead ? `<span class="qs-card-lead">${esc(c.lead)}</span>` : ''}
            </div>
          </div>
          ${c.body ? `<p>${esc(c.body)}</p>` : ''}
          ${points}
        </article>`;
      }).join('')}</div>`;
    }
    if (Array.isArray(data.items) && data.items.length) {
      html += `<div class="qs-items">${data.items.map(function (it) {
        var raw = it.text || it.body || '';

        /* Item numerado é passo de uma sequência, e nele a dose vem depois
           do travessão: "puxar palma para fora — 20 s cada lado, 3×". Em
           etiquetas, o tempo e as repetições saltam aos olhos sem obrigar
           a ler a frase inteira. Listas com ícone seguem como estavam:
           ali o travessão é pontuação, não separador de dose. */
        if (it.n != null) {
          var d = splitDose(raw);
          var doses = (d ? d.tags : []).map(function (t) {
            var rep = t.indexOf('×') !== -1;   // "3×" é repetição; "20 s" é tempo
            return `<span class="qs-dose ${rep ? 'is-rep' : 'is-time'}">${esc(t)}</span>`;
          }).join('');
          var thumb = it.image
            ? `<div class="qs-item-thumb">${zoomWrap(it.image, `<img src="${esc(it.image)}" alt="${esc(it.imageAlt || it.title || '')}" loading="eager" decoding="async">`)}</div>`
            : `<span class="qs-item-num">${esc(it.n)}</span>`;
          return `<div class="qs-item is-step${it.image ? ' has-thumb' : ''}">
            ${thumb}
            <div class="qs-item-txt">
              <div class="qs-item-head">
                <span class="qs-item-label">${it.n != null ? `<span class="qs-item-n">${esc(it.n)}</span>` : ''}${it.title ? `<b>${esc(it.title)}</b>` : ''}</span>
                ${doses ? `<span class="qs-doses">${doses}</span>` : ''}
              </div>
              <p>${esc(d ? d.move : raw)}</p>
              ${d && d.caveat ? `<span class="qs-item-warn">${esc(d.caveat)}</span>` : ''}
            </div>
          </div>`;
        }

        var mark = it.icon ? `<span class="qs-item-ico" aria-hidden="true">${esc(it.icon)}</span>` : '';
        var warn = it.warn ? `<span class="qs-item-warn">${esc(it.warn)}</span>` : '';
        if (it.title) {
          return `<div class="qs-item has-title${it.icon ? ' has-ico' : ''}">
            ${mark}
            <div class="qs-item-txt">
              <b class="qs-item-title">${esc(String(it.title).replace(/:\s*$/, ''))}</b>
              <p>${esc(raw)}</p>
              ${warn}
            </div>
          </div>`;
        }
        return `<div class="qs-item">${mark}<p>${esc(raw)}</p>${warn}</div>`;
      }).join('')}</div>`;
    }
    if (Array.isArray(data.compare) && data.compare.length) {
      html += `<div class="qs-compare">${data.compare.map(function (c) {
        var ok = !!c.ok;
        return `<article class="qs-compare-col ${ok ? 'is-ok' : 'is-bad'}">
          <div class="qs-compare-lbl">${esc(c.label || (ok ? '✓ Correto' : '✕ Evitar'))}</div>
          <p>${esc(c.text || c.body || '')}</p>
        </article>`;
      }).join('')}</div>`;
    }
    if (Array.isArray(data.bullets) && data.bullets.length) {
      html += `<ul class="qs-bullets">${data.bullets.map(function (b) {
        return `<li>${esc(b)}</li>`;
      }).join('')}</ul>`;
    }
    if (Array.isArray(data.rules) && data.rules.length) {
      html += `<div class="qs-rules">${data.rules.map(function (r) {
        return `<article class="qs-rule"><p>${esc(r.text || r.body || '')}</p></article>`;
      }).join('')}</div>`;
    }
    if (data.quote) html += `<blockquote class="qs-quote">${esc(data.quote)}</blockquote>`;
    if (data.note) {
      if (typeof data.note === 'object' && data.note) {
        html += `<aside class="qs-note qs-note-card">
          ${data.note.label ? `<strong class="qs-note-label">${esc(data.note.label)}</strong>` : ''}
          <span class="qs-note-text">${esc(data.note.text || data.note.body || '')}</span>
        </aside>`;
      } else {
        html += `<p class="qs-note">${esc(data.note)}</p>`;
      }
    }
    return html;
  }

  /* Separa o movimento da dose num passo de sequência. Devolve null quando
     não há travessão, e aí o texto segue inteiro — nada se perde se o
     conteúdo mudar de formato depois. Um aviso entre parênteses no fim sai
     da dose e vira linha própria, para não virar etiqueta. */
  function splitDose(text) {
    var i = String(text).indexOf('—');
    if (i < 0) return null;
    var move = text.slice(0, i).trim();
    var rest = text.slice(i + 1).trim();
    var caveat = '';
    var par = rest.match(/\(([^)]*)\)\s*$/);
    if (par) {
      caveat = par[1].trim();
      rest = rest.slice(0, par.index).trim();
    }
    var tags = rest.split(',').map(function (s) { return s.trim(); }).filter(Boolean);
    if (!move || !tags.length) return null;
    return { move: move, tags: tags, caveat: caveat };
  }

  function contentHTML(data) {
    var hasImg = !!data.image;
    var rulesCount = Array.isArray(data.rules) ? data.rules.length : 0;
    var normCompact = !!(data.compact || (hasImg && rulesCount > 0));

    /* Sequência com foto: um exercício por vez, em vez da lista densa.
       A ficha de alongamento usa isso — a foto grande ensina o movimento. */
    if (data.steps && Array.isArray(data.items) && data.items.length) {
      return stepsHTML(data);
    }
    if (data.skin === 'ficha' && Array.isArray(data.items) && data.items.length) {
      return fichaHTML(data);
    }

    var head = `<h2 class="qs-title">${esc(data.title || '')}</h2>
          ${contentBlocks(data)}`;
    if (hasImg && data.layout === 'stack') {
      /* Infográfico / foto protagonista: só o título em cima; a imagem fala sozinha.
         body/items ficam nos dados para a narração, sem poluir o layout. */
      return `
      <article class="qs-screen is-content is-stack" data-qs-root data-type="content">
        <div class="qs-panel qs-panel-stack">
          <h2 class="qs-title">${esc(data.title || '')}</h2>
        </div>
        <div class="qs-media qs-media-wide">
          ${mediaHTML(data, { contain: data.imageFit === 'contain' })}
        </div>
      </article>`;
    }
    if (hasImg) {
      var extra = '';
      if (normCompact) extra += ' is-norm-compact';
      if (rulesCount >= 4) extra += ' is-norm-rules';
      if (Array.isArray(data.stats) && data.stats.length) extra += ' is-norm-stats';
      return `
      <article class="qs-screen is-content has-split${extra}" data-qs-root data-type="content">
        <div class="qs-media qs-media-split">
          ${mediaHTML(data)}
        </div>
        <div class="qs-panel qs-panel-split">
          ${head}
        </div>
      </article>`;
    }
    var dense = (data.items && data.items.length > 6) || (data.cards && data.cards.length > 3);
    var skin = data.skin === 'actions' ? ' is-actions'
      : (data.skin === 'agents' ? ' is-agents' : '');
    return `
      <article class="qs-screen is-content is-text${dense ? ' is-dense' : ''}${skin}" data-qs-root data-type="content">
        <div class="qs-panel qs-panel-text">
          ${head}
        </div>
      </article>`;
  }

  function fichaHTML(data) {
    var items = Array.isArray(data.items) ? data.items : [];
    var list = items.map(function (it, i) {
      var title = String(it.title || '').replace(/:\s*$/, '');
      var text = it.text || it.body || '';
      var warn = it.warn
        ? `<span class="qs-ficha-warn">${esc(it.warn)}</span>`
        : '';
      return `<article class="qs-ficha-item" data-qs-ficha="${i}">
        <span class="qs-ficha-ico" aria-hidden="true">${esc(it.icon || '•')}</span>
        <div class="qs-ficha-body">
          <b class="qs-ficha-title">${esc(title)}</b>
          <p class="qs-ficha-text">${esc(text)}</p>
          ${warn}
        </div>
      </article>`;
    }).join('');
    return `
      <article class="qs-screen is-content is-text is-ficha" data-qs-root data-type="content" data-ficha="1">
        <div class="qs-panel qs-panel-text">
          <h2 class="qs-title">${esc(data.title || '')}</h2>
          <div class="qs-ficha-list">${list}</div>
        </div>
      </article>`;
  }

  function stepsHTML(data) {
    var items = data.items || [];
    var unit = data.stepUnit || 'Exercício';
    var nextLbl = data.stepNext || 'Próximo exercício';
    var photoOnly = items.every(function (it) {
      return !!(it.image && !(it.title || it.text || it.body));
    });
    var textOnly = items.every(function (it) { return !it.image; });
    /* Ficha com texto + foto (ex.: emergências): mantém o layout compacto
       da text-steps, em vez da grade larga feita pras sequências com ilustração. */
    var textLayout = !photoOnly && items.every(function (it) {
      return !!(it.title || it.text || it.body);
    });
    var slides = items.map(function (it, i) {
      var raw = it.text || it.body || '';
      var d = splitDose(raw);
      var doses = (d ? d.tags : []).map(function (t) {
        var rep = t.indexOf('×') !== -1;
        return `<span class="qs-dose ${rep ? 'is-rep' : 'is-time'}">${esc(t)}</span>`;
      }).join('');
      var num = it.n != null ? it.n : (i + 1);
      var warn = it.warn || (d && d.caveat) || '';
      var hasInfo = !!(it.title || raw);
      var info = hasInfo
        ? `<div class="qs-step-info">
          <div class="qs-step-head">
            <span class="qs-step-num">${esc(num)}</span>
            ${it.title ? `<b class="qs-step-title">${esc(it.title)}</b>` : ''}
            ${doses ? `<span class="qs-doses">${doses}</span>` : ''}
          </div>
          <p class="qs-step-move">${esc(d ? d.move : raw)}</p>
          ${warn ? `<span class="qs-item-warn">${esc(warn)}</span>` : ''}
        </div>`
        : '';
      var mediaInner = it.image
        ? `<img class="qs-step-img" src="${esc(it.image)}" alt="${esc(it.imageAlt || it.title || '')}" loading="${i < 2 ? 'eager' : 'lazy'}" decoding="async">`
        : (it.icon
          ? `<div class="qs-step-fallback is-icon"><span aria-hidden="true">${esc(it.icon)}</span></div>`
          : `<div class="qs-step-fallback">${esc(num)}</div>`);
      var tone = it.tone || (textLayout ? ('e' + ((i % 7) + 1)) : '');
      var toneClass = tone ? ' tone-' + esc(tone) : '';
      return `<div class="qs-step${i === 0 ? ' is-on' : ''}${photoOnly ? ' is-photo' : ''}${textLayout ? ' is-text' : ''}${it.image ? ' has-photo' : ''}${toneClass}" data-qs-step="${i}"${i === 0 ? '' : ' hidden'}>
        <div class="qs-step-media">${mediaInner}</div>
        ${info}
      </div>`;
    }).join('');

    return `
      <article class="qs-screen is-content is-steps${photoOnly ? ' is-photo-steps' : ''}${textLayout ? ' is-text-steps' : ''}" data-qs-root data-type="content">
        <div class="qs-steps" data-qs-steps data-step-unit="${esc(unit)}" data-step-next="${esc(nextLbl)}" data-step-finish="${esc(data.stepFinish || 'Concluir sequência')}">
          <header class="qs-steps-top">
            <h2 class="qs-title">${esc(data.title || '')}</h2>
            <span class="qs-steps-count" data-qs-step-count>${esc(unit)} 1 de ${items.length}</span>
          </header>
          <div class="qs-steps-track">${slides}</div>
          <div class="qs-steps-actions">
            <button type="button" class="qs-step-back" data-qs-step-prev hidden>Ver anterior</button>
            <button type="button" class="qs-step-cta" data-qs-step-next>
              ${esc(nextLbl)}
            </button>
          </div>
        </div>
      </article>`;
  }

  function shuffle(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  function reflectHTML(data) {
    var choices = Array.isArray(data.choices) ? data.choices : [];
    var choiceHtml = choices.length
      ? `<div class="qs-reflect-choices">${choices.map(function (c, i) {
          return `<button type="button" class="qs-reflect-choice" data-qs-choice="${i}">${c.icon ? `<span aria-hidden="true">${esc(c.icon)}</span>` : ''}${esc(c.text || c.label || '')}</button>`;
        }).join('')}</div>`
      : `<button type="button" class="qs-reflect-tap" data-qs-reveal>Toque para pensar</button>`;
    var prompt = esc(data.prompt || data.body || '');
    if (data.promptAccent) {
      prompt = esc(data.prompt || '') + (data.prompt ? '<br>' : '') +
        '<span>' + esc(data.promptAccent) + '</span>';
    }
    return `
      <article class="qs-screen is-content is-text is-reflect" data-qs-root data-type="reflect">
        <div class="qs-panel qs-panel-text qs-panel-reflect">
          <header class="qs-reflect-head">
            <h2 class="qs-title">${esc(data.title || '')}</h2>
          </header>
          <div class="qs-reflect">
            <p class="qs-reflect-prompt">${prompt}</p>
            <div class="qs-reflect-mark" aria-hidden="true">?</div>
            ${choiceHtml}
            <p class="qs-reflect-answer" data-qs-answer hidden>${esc(data.answer || data.quote || '')}</p>
          </div>
        </div>
      </article>`;
  }

  function compareHTML(data) {
    var sides = Array.isArray(data.compare) ? data.compare : [];
    var hasPhotos = sides.some(function (c) { return !!c.image; });
    var open = !!data.open;
    return `
      <article class="qs-screen is-content is-text is-compare${hasPhotos ? ' has-photos' : ''}${open ? ' is-open' : ''}" data-qs-root data-type="compare">
        <div class="qs-panel qs-panel-text">
          <h2 class="qs-title">${esc(data.title || '')}</h2>
          ${data.body && !open ? `<p class="qs-compare-guide">${esc(data.body)}</p>` : ''}
          <div class="qs-compare">${sides.map(function (c, i) {
            var ok = !!c.ok;
            var imgInner = c.image
              ? `<img class="qs-compare-img" src="${esc(c.image)}" alt="${esc(c.imageAlt || c.label || '')}" loading="eager" decoding="async">`
              : '';
            var img = c.image
              ? `<div class="qs-compare-media">${hasPhotos && !open ? zoomWrap(c.image, imgInner) : imgInner}</div>`
              : '';
            return `<button type="button" class="qs-compare-col ${ok ? 'is-ok' : 'is-bad'}${c.image ? ' has-img' : ''}${open ? ' is-open' : ''}" data-qs-compare="${i}"${open ? ' disabled' : ''}>
              <div class="qs-compare-lbl">${esc(c.label || (ok ? '✓ Correto' : '✕ Evitar'))}</div>
              ${img}
              ${open ? '' : '<p class="qs-compare-hint">Toque para ver</p>'}
              <p class="qs-compare-reveal"${open ? '' : ' hidden'}>${esc(c.text || c.body || '')}</p>
            </button>`;
          }).join('')}</div>
        </div>
      </article>`;
  }

  function orderHTML(data) {
    var items = Array.isArray(data.items) ? data.items : [];
    var cards = shuffle(items).map(function (it) {
      return `<button type="button" class="qs-seq-card" data-qs-seq="${esc(it.key)}">
        <span class="qs-seq-badge" aria-hidden="true"></span>
        <span>${esc(it.text)}</span>
      </button>`;
    }).join('');
    return `
      <article class="qs-screen is-content is-text is-order is-timed" data-qs-root data-type="order">
        <div class="qs-qbar-wrap"><div class="qs-qbar"><i data-qs-timer></i></div></div>
        <div class="qs-panel qs-panel-text">
          <h2 class="qs-title">${esc(data.title || 'Ordene a rotina')}</h2>
          <p class="qs-body">${esc(data.body || 'Toque nos cuidados na ordem que você seguiria.')}</p>
          <p class="qs-seq-progress" data-qs-seq-progress>0 de ${items.length} selecionados</p>
          <div class="qs-seq-wrap">${cards}</div>
          <div class="qs-seq-foot">
            <p class="qs-seq-fb" data-qs-seq-fb hidden></p>
            <button type="button" class="qs-seq-retry" data-qs-seq-retry hidden>Tentar de novo</button>
          </div>
        </div>
      </article>`;
  }

  function matchHTML(data) {
    var pairs = Array.isArray(data.pairs) ? data.pairs : [];
    return `
      <article class="qs-screen is-content is-text is-match is-dense" data-qs-root data-type="match">
        <div class="qs-panel qs-panel-text">
          <h2 class="qs-title">${esc(data.title || 'Associe os pares')}</h2>
          ${data.body ? `<p class="qs-body">${esc(data.body)}</p>` : ''}
          <div class="qs-match-hud">
            <span data-qs-match-time>⏱️ 0s</span>
            <span data-qs-match-progress>0 de ${pairs.length} pares</span>
          </div>
          <div class="qs-match">
            <div class="qs-match-side is-ex">
              <div class="qs-match-col-title">${esc(data.leftTitle || 'Exercício')}</div>
              <div data-qs-match-ex></div>
            </div>
            <div class="qs-match-side is-body">
              <div class="qs-match-col-title">${esc(data.rightTitle || 'Região do corpo')}</div>
              <div data-qs-match-body></div>
            </div>
          </div>
        </div>
      </article>`;
  }

  /* Ritmo: o aluno toca no compasso (ex.: compressões da RCP, 100–120 por minuto).
     Campos: title, body, bpmMin, bpmMax, guideBpm, taps, tries, scaleMin, scaleMax. */
  function rhythmHTML(data) {
    var min = Number(data.bpmMin) || 100;
    var max = Number(data.bpmMax) || 120;
    var taps = Math.max(6, Number(data.taps) || 12);
    var sMin = Number(data.scaleMin) || 60;
    var sMax = Number(data.scaleMax) || 160;
    function pct(v) { return Math.max(0, Math.min(100, ((v - sMin) / (sMax - sMin)) * 100)); }
    return `
      <article class="qs-screen is-content is-text is-rhythm" data-qs-root data-type="rhythm">
        <div class="qs-panel qs-panel-text">
          <header class="qs-rhythm-head">
            <h2 class="qs-title">${esc(data.title || 'Ritmo')}</h2>
            ${data.body ? `<p class="qs-body">${esc(data.body)}</p>` : ''}
          </header>
          <div class="qs-rhythm" data-qs-r-phase="guide">
            <p class="qs-rhythm-status" data-qs-r-status role="status" aria-live="polite"></p>
            <div class="qs-rhythm-stage">
              <span class="qs-rhythm-ring" data-qs-r-ring aria-hidden="true"></span>
              <button type="button" class="qs-rhythm-btn" data-qs-r-btn aria-label="Comprimir: toque no ritmo">
                <span class="qs-rhythm-ico" aria-hidden="true">🫀</span>
                <span class="qs-rhythm-btn-txt">Comprimir</span>
              </button>
            </div>
            <div class="qs-rhythm-meter">
              <div class="qs-rhythm-gauge" aria-hidden="true">
                <span class="qs-rhythm-zone" style="left:${pct(min)}%;width:${pct(max) - pct(min)}%"></span>
                <span class="qs-rhythm-marker" data-qs-r-marker hidden></span>
              </div>
              <div class="qs-rhythm-scale" aria-hidden="true">
                <span style="left:${pct(min)}%">${min}</span>
                <span style="left:${pct(max)}%">${max}</span>
              </div>
              <div class="qs-rhythm-hud">
                <span data-qs-r-bpm>— por minuto</span>
                <span data-qs-r-count>0 de ${taps} toques</span>
              </div>
            </div>
            <div class="qs-rhythm-actions">
              <button type="button" class="qs-rhythm-act" data-qs-r-go>Já peguei o ritmo</button>
              <button type="button" class="qs-rhythm-act" data-qs-r-retry hidden>Tentar de novo</button>
            </div>
          </div>
        </div>
      </article>`;
  }

  function quizIntroHTML(data) {
    var count = data.count != null ? Number(data.count) : null;
    var min = data.minCorrect != null ? Number(data.minCorrect) : null;
    var desc = data.body || '';
    if (!desc && count) {
      desc = 'Responda <strong>' + count + '</strong> perguntas de múltipla escolha.';
      if (min) desc += ' Você precisa acertar no mínimo <strong>' + min + '</strong> para avançar.';
      desc += ' Cada acerto vale <strong>50 pontos</strong>.';
    }
    return `
      <article class="qs-screen is-quiz-intro" data-qs-root data-type="quiz-intro">
        <div class="qs-quiz-intro">
          <div class="qs-quiz-intro-icon" aria-hidden="true">${esc(data.icon || '🎮')}</div>
          <h2 class="qs-quiz-intro-title">${esc(data.title || 'Desafio do módulo')}</h2>
          <p class="qs-quiz-intro-desc">${desc}</p>
          <button type="button" class="qs-quiz-intro-btn" data-qs-start>Iniciar desafio</button>
        </div>
      </article>`;
  }

  function quizResultHTML(data) {
    var passed = !!data.passed;
    var hits = data.score != null ? data.score : 0;
    var total = data.total != null ? data.total : 0;
    var min = data.minCorrect != null ? data.minCorrect : 0;
    var points = data.points != null ? data.points : 0;
    var streak = data.streak != null ? data.streak : 0;
    var medal = data.medal || data.icon || (passed ? '🥇' : '📚');
    var medalName = data.medalName || '';
    var rank = data.medalRank || (passed ? 'gold' : 'none');
    var title = data.title || (passed ? 'Desafio concluído!' : 'Desafio não concluído');
    var unlock = data.titleUnlock || null;
    var hasTitle = !!(passed && unlock && unlock.title);
    var desc = data.body || (passed
      ? ('Você acertou <strong>' + hits + '</strong> de <strong>' + total + '</strong> questões.')
      : ('Você acertou <strong>' + hits + '</strong> de <strong>' + total + '</strong>. É necessário acertar pelo menos <strong>' + min + '</strong>. Estude e tente novamente.'));
    var actions = passed
      ? ''
      : `<button type="button" class="qs-quiz-intro-btn" data-qs-retry>Jogar novamente</button>`;
    var actionsBlock = actions
      ? `<div class="qs-quiz-result-actions">${actions}</div>`
      : '';

    // reprovado: mostra os temas das questões erradas (sem entregar as respostas)
    var topics = (!passed && Array.isArray(data.review)) ? data.review.filter(Boolean) : [];
    var reviewBlock = topics.length
      ? `<section class="qs-review">
          <p class="qs-review-head">O que revisar antes de tentar de novo</p>
          <ul class="qs-review-list">
            ${topics.map(function (t) {
              return `<li class="qs-review-item"><span class="qs-review-dot" aria-hidden="true"></span><span>${esc(t)}</span></li>`;
            }).join('')}
          </ul>
        </section>`
      : '';
    var scoreBar = `<div class="qs-result-scorebar" aria-label="Placar">
        <span><b>${points}</b> pts</span>
        <span class="qs-result-scorebar-dot" aria-hidden="true"></span>
        <span><b>${hits}/${total}</b> acertos</span>
        ${streak ? `<span class="qs-result-scorebar-dot" aria-hidden="true"></span><span>seq. <b>${streak}</b></span>` : ''}
      </div>`;

    if (hasTitle) {
      return `
      <article class="qs-screen is-quiz-result" data-qs-root data-type="quiz-result">
        <div class="qs-quiz-result is-pass is-title-focus medal-${esc(rank)}">
          <p class="qs-result-eyebrow">${esc(unlock.moduleLabel || 'Módulo concluído')}</p>
          <div class="qs-medal" aria-hidden="true">
            <span class="qs-medal-face">${esc(medal)}</span>
          </div>
          <p class="qs-title-earned-kicker">Título conquistado</p>
          <h2 class="qs-title-earned-name">${esc(unlock.title)}</h2>
          ${unlock.body ? `<p class="qs-title-earned-body">${esc(unlock.body)}</p>` : ''}
          ${scoreBar}
          ${actionsBlock}
        </div>
      </article>`;
    }

    return `
      <article class="qs-screen is-quiz-result" data-qs-root data-type="quiz-result">
        <div class="qs-quiz-result ${passed ? 'is-pass' : 'is-fail'}${topics.length ? ' has-review' : ''} medal-${esc(rank)}">
          <div class="qs-medal" aria-hidden="true">
            <span class="qs-medal-face">${esc(medal)}</span>
          </div>
          ${medalName ? `<div class="qs-medal-name">${esc(medalName)}</div>` : ''}
          <h2 class="qs-quiz-result-title">${esc(title)}</h2>
          ${scoreBar}
          <p class="qs-quiz-result-desc">${desc}</p>
          ${reviewBlock}
          ${actionsBlock}
        </div>
      </article>`;
  }

  function questionHTML(data) {
    var alts = Array.isArray(data.alternatives) ? data.alternatives.slice(0, 4) : [];
    var count = Math.max(1, alts.length);
    var variant = data.variant || '';
    var opts = alts.map(function (a, i) {
      return `
        <button type="button" class="qs-opt" data-tone="${i % 4}" data-id="${esc(a.id != null ? a.id : i)}" data-index="${i}">
          <span class="qs-num">${variant === 'lista' ? String.fromCharCode(65 + i) : i + 1}</span>
          <span class="qs-txt">${esc(a.text)}</span>
          <span class="qs-mark" aria-hidden="true"></span>
        </button>`;
    }).join('');

    return `
      <article class="qs-screen is-question" data-qs-root data-type="question"${variant ? ` data-variant="${esc(variant)}"` : ''}>
        <div class="qs-timer" aria-hidden="true"><i data-qs-timer></i></div>
        <div class="qs-media qs-media-hero">
          ${mediaHTML(data, { noZoom: true })}
          <div class="qs-result-banner" data-qs-result role="status" aria-live="polite" hidden>
            <span data-qs-result-text></span>
          </div>
        </div>
        <div class="qs-qbar-wrap">
          <div class="qs-qbar">${esc(data.question || '')}</div>
        </div>
        <div class="qs-opts count-${count}" data-qs-opts>
          ${opts}
        </div>
        <div class="qs-foot qs-foot-quiz">
          ${variant === 'confirmar' ? '<button type="button" class="qs-confirm" data-qs-confirm disabled>Escolha uma ação</button>' : ''}
          <div class="qs-explain" data-qs-explain></div>
        </div>
      </article>`;
  }

  function QuestionScreen(container, data, options) {
    this.el = typeof container === 'string' ? document.querySelector(container) : container;
    this.options = options || {};
    this.state = { answered: false, selectedIndex: null, correct: false };
    this.data = null;
    this._onClick = this._onClick.bind(this);
    this.update(data || {});
  }

  QuestionScreen.mount = function (container, data, options) {
    return new QuestionScreen(container, data, options);
  };

  QuestionScreen.prototype.update = function (data) {
    this._stopTimer();
    this.data = data || {};
    this.state.answered = false;
    this._pending = null;
    this.state.selectedIndex = null;
    this.state.correct = false;

    var type = this.data.type || 'question';
    var html = questionHTML(this.data);
    if (type === 'cover') html = coverHTML(this.data);
    else if (type === 'finale') html = finaleHTML(this.data);
    else if (type === 'content') html = contentHTML(this.data);
    else if (type === 'video') html = videoHTML(this.data);
    else if (type === 'image') html = imageHTML(this.data);
    else if (type === 'reflect') html = reflectHTML(this.data);
    else if (type === 'compare') html = compareHTML(this.data);
    else if (type === 'order') html = orderHTML(this.data);
    else if (type === 'match') html = matchHTML(this.data);
    else if (type === 'rhythm') html = rhythmHTML(this.data);
    else if (type === 'quiz-intro') html = quizIntroHTML(this.data);
    else if (type === 'quiz-result') html = quizResultHTML(this.data);

    this.el.innerHTML = html;
    this.root = this.el.querySelector('[data-qs-root]');
    this.el.removeEventListener('click', this._onClick);
    this.el.addEventListener('click', this._onClick);
    ensureLightbox();

    var lockedVideo = type === 'video' && !!(this.data.embed || this.data.panda || this.data.video);
    var fichaGate = type === 'content' && this.data && this.data.skin === 'ficha';
    var gated = type === 'question' || type === 'order' || type === 'match' || type === 'rhythm' || type === 'reflect' || type === 'compare' || lockedVideo || (type === 'content' && !!(this.data && this.data.steps)) || fichaGate;
    if (!gated) this.state.answered = true;

    if (type === 'video' && (this.data.embed || this.data.panda || this.data.youtube || this.data.video)) {
      this._bindVideoTags();
    }
    if (type === 'reflect') this._bindReflect();
    if (type === 'compare') this._bindCompare();
    if (type === 'order') this._bindOrder();
    if (type === 'match') this._bindMatch();
    if (type === 'rhythm') this._bindRhythm();
    if (type === 'content' && this.data && this.data.steps) this._bindSteps();
    if (fichaGate) this._bindFicha();

    if ((type === 'question' || type === 'order') && this.options.quizScoring) {
      if (this.root) this.root.classList.add('is-timed');
      this._startTimer();
    }

    if (typeof this.options.onRender === 'function') {
      this.options.onRender(this.data, this);
    }
  };

  QuestionScreen.prototype._stopTimer = function () {
    if (this._tick) {
      clearInterval(this._tick);
      this._tick = null;
    }
  };

  QuestionScreen.prototype._startTimer = function () {
    this._stopTimer();
    var self = this;
    var total = Number(this.options.time || this.data.time || 40);
    this._tTot = total;
    this._tLeft = total;
    var bar = this.el.querySelector('[data-qs-timer]');
    if (bar) bar.style.width = '100%';
    this._tick = setInterval(function () {
      if (self.state.answered) {
        self._stopTimer();
        return;
      }
      self._tLeft -= 0.1;
      if (bar) bar.style.width = (Math.max(0, self._tLeft / self._tTot) * 100) + '%';
      if (self._tLeft <= 0) {
        self._stopTimer();
        self.timesUp();
      }
    }, 100);
  };

  QuestionScreen.prototype._quizPoints = function (correct) {
    if (!correct) return 0;
    /* Pontuação fixa por acerto: sem bônus de rapidez. */
    var max = this.options.maxPoints != null ? Number(this.options.maxPoints) : 50;
    return max;
  };

  QuestionScreen.prototype._setVideoPlaying = function (on) {
    var root = this.el.querySelector('[data-qs-root]') || this.root;
    if (root) root.classList.toggle('is-playing', !!on);
  };

  QuestionScreen.prototype._unlockVideo = function () {
    if (this._videoUnlocked) return;
    this._videoUnlocked = true;
    this._complete({ kind: 'video' });
  };

  QuestionScreen.prototype._bindVideoTags = function () {
    var self = this;
    var root = this.el;
    var native = root.querySelector('video.qs-player');
    var iframe = root.querySelector('iframe[data-qs-panda]');

    function expand() { self._setVideoPlaying(true); }
    function collapse() { self._setVideoPlaying(false); }

    var guard = {
      maxWatched: 0,
      duration: parseClock(this.data.duration),
      lockUntil: 0,
      lastWall: 0,
      lastSnapAt: 0,
      snapTimer: null,
      wasPlaying: false
    };
    this._videoGuard = guard;
    this._videoUnlocked = false;

    function isLocked() {
      return Date.now() < guard.lockUntil;
    }

    function applyTime(target) {
      try {
        if (self._pandaPlayer && self._pandaPlayer.setCurrentTime) self._pandaPlayer.setCurrentTime(target);
      } catch (e) {}
      try {
        if (iframe && iframe.contentWindow) {
          iframe.contentWindow.postMessage({ type: 'currentTime', parameter: target }, '*');
        }
      } catch (e) {}
      if (native) { try { native.currentTime = target; } catch (e) {} }
    }

    function resumePlay() {
      try {
        if (self._pandaPlayer && typeof self._pandaPlayer.play === 'function') self._pandaPlayer.play();
      } catch (e) {}
      if (native) {
        try {
          var p = native.play();
          if (p && typeof p.catch === 'function') p.catch(function () {});
        } catch (e) {}
      }
      expand();
    }

    function snapBack() {
      if (self._videoUnlocked) return;
      var now = Date.now();
      var target = Math.max(0, guard.maxWatched);
      /* Trava curta: vários cliques pra frente não rearmam loop infinito. */
      guard.lockUntil = Math.max(guard.lockUntil, now + 1000);
      if (now - guard.lastSnapAt > 180) {
        guard.lastSnapAt = now;
        applyTime(target);
      }
      clearTimeout(guard.snapTimer);
      guard.snapTimer = setTimeout(function () {
        guard.lockUntil = 0;
        guard.lastWall = Date.now();
        applyTime(Math.max(0, guard.maxWatched));
        if (guard.wasPlaying) resumePlay();
      }, 1000);
    }

    function handleSeek(t) {
      if (self._videoUnlocked || isLocked()) return;
      if (typeof t === 'number' && !isNaN(t) && t > guard.maxWatched + VIDEO_SEEK_TOLERANCE) {
        snapBack();
      }
    }

    function handleTime(t, dur) {
      if (typeof dur === 'number' && dur > 0) guard.duration = dur;
      if (typeof t !== 'number' || isNaN(t)) return;
      if (self._videoUnlocked) return;
      if (isLocked()) {
        if (t > guard.maxWatched + VIDEO_SEEK_TOLERANCE && Date.now() - guard.lastSnapAt > 220) {
          guard.lastSnapAt = Date.now();
          applyTime(Math.max(0, guard.maxWatched));
        }
        return;
      }
      var now = Date.now();
      var wallDt = guard.lastWall ? Math.max(0, (now - guard.lastWall) / 1000) : 0.25;
      guard.lastWall = now;
      // só cresce no ritmo real de reprodução: seek disfarçado estoura a folga
      var allowed = guard.maxWatched + Math.min(VIDEO_TICK_TOLERANCE, wallDt * 1.4 + 0.12);
      if (t > allowed) { snapBack(); return; }
      if (t > guard.maxWatched) guard.maxWatched = t;
      if (guard.maxWatched >= unlockThreshold(guard.duration)) self._unlockVideo();
    }

    this._videoOnTime = handleTime;
    this._videoOnSeek = handleSeek;

    if (native) {
      native.addEventListener('play', function () { guard.wasPlaying = true; expand(); });
      native.addEventListener('pause', function () {
        if (!isLocked()) guard.wasPlaying = false;
        collapse();
      });
      native.addEventListener('ended', function () { collapse(); self._unlockVideo(); });
      native.addEventListener('loadedmetadata', function () { handleTime(0, native.duration); });
      native.addEventListener('seeking', function () { handleSeek(native.currentTime); });
      native.addEventListener('seeked', function () { handleSeek(native.currentTime); });
      native.addEventListener('timeupdate', function () { handleTime(native.currentTime, native.duration); });
    }

    var videoId = (String(this.data.embed || this.data.panda || '').match(/[?&]v=([0-9a-f-]{36})/i) || [])[1] || '';

    this._onVideoMsg = function (ev) {
      var data = ev && ev.data;
      if (data == null) return;
      var msg = '';
      var payload = null;
      if (typeof data === 'object') {
        payload = data;
        msg = data.message || data.event || data.type || '';
      } else if (typeof data === 'string') {
        msg = data;
        try {
          var parsed = JSON.parse(data);
          payload = parsed;
          msg = parsed.message || parsed.event || parsed.type || data;
        } catch (e) {}
      }
      msg = String(msg).toLowerCase();
      if (payload && payload.video && videoId && String(payload.video) !== videoId) return;

      var t = payload && typeof payload.currentTime === 'number' ? payload.currentTime : null;
      var dur = payload && typeof payload.duration === 'number' ? payload.duration : null;

      if (msg.indexOf('panda_play') !== -1) {
        guard.wasPlaying = true;
        expand();
        guard.lastWall = Date.now();
      }
      if (msg.indexOf('panda_pause') !== -1) {
        if (!isLocked()) guard.wasPlaying = false;
        collapse();
      }
      if (msg.indexOf('panda_ended') !== -1 || msg.indexOf('panda_complete') !== -1) {
        collapse();
        self._unlockVideo();
        return;
      }
      if (msg.indexOf('panda_seeking') !== -1 || msg.indexOf('panda_seeked') !== -1) {
        handleSeek(t);
        return;
      }
      if (msg.indexOf('panda_timeupdate') !== -1) handleTime(t, dur);
    };
    window.addEventListener('message', this._onVideoMsg);

    if (iframe && iframe.id) {
      this._ensurePandaApi(iframe.id, function (player) {
        self._pandaPlayer = player;
        try {
          var d = player.getDuration && player.getDuration();
          if (typeof d === 'number' && d > 0) guard.duration = d;
        } catch (e) {}
        guard.lastWall = Date.now();
        try {
          player.onEvent(function (e) {
            var msg = e && e.message;
            var t = e && typeof e.currentTime === 'number' ? e.currentTime : null;
            if (msg === 'panda_play') {
              guard.wasPlaying = true;
              expand();
              guard.lastWall = Date.now();
            }
            if (msg === 'panda_pause') {
              if (!isLocked()) guard.wasPlaying = false;
              collapse();
            }
            if (msg === 'panda_ended') { collapse(); self._unlockVideo(); return; }
            if (msg === 'panda_seeking' || msg === 'panda_seeked') { handleSeek(t); return; }
            if (msg === 'panda_timeupdate') {
              var dd = 0;
              try { dd = player.getDuration && player.getDuration(); } catch (err) {}
              handleTime(t, dd);
            }
          });
        } catch (err) {}
      });
    }
  };

  QuestionScreen.prototype._ensurePandaApi = function (iframeId, onReady) {
    var API = 'https://player.pandavideo.com.br/api.v2.js';
    function bind() {
      try {
        if (typeof PandaPlayer === 'undefined') return;
        var player = new PandaPlayer(iframeId, {
          onReady: function () { onReady(player); }
        });
      } catch (err) {}
    }
    window.pandascripttag = window.pandascripttag || [];
    window.pandascripttag.push(bind);
    if (!document.querySelector('script[src="' + API + '"]')) {
      var s = document.createElement('script');
      s.src = API;
      s.async = true;
      document.head.appendChild(s);
    } else if (typeof PandaPlayer !== 'undefined') {
      bind();
    }
  };

  QuestionScreen.prototype._onClick = function (e) {
    var zoomBtn = e.target.closest('[data-qs-zoom]');
    if (zoomBtn) {
      e.preventDefault();
      e.stopPropagation();
      var zImg = zoomBtn.parentNode && zoomBtn.parentNode.querySelector('img');
      openLightbox(zoomBtn.getAttribute('data-qs-zoom'), zImg ? zImg.alt : '');
      return;
    }
    var opt = e.target.closest('.qs-opt');
    var start = e.target.closest('[data-qs-start]');
    var retry = e.target.closest('[data-qs-retry]');
    var finish = e.target.closest('[data-qs-finish]');
    var conf = e.target.closest('[data-qs-confirm]');
    if (conf) {
      if (!this.state.answered && this._pending != null) {
        beep('click');
        var pend = this._pending;
        this._pending = null;
        this.select(pend);
      }
      return;
    }
    /* variante 'confirmar': o 1º toque escolhe, o botão de baixo confirma (dá para trocar de ideia) */
    if (opt && !this.state.answered && this.data.variant === 'confirmar') {
      beep('click');
      this._pending = +opt.dataset.index;
      this.el.querySelectorAll('.qs-opt').forEach(function (b) { b.classList.toggle('is-selected', b === opt); });
      var cb = this.el.querySelector('[data-qs-confirm]');
      if (cb) { cb.disabled = false; cb.textContent = 'Confirmar esta decisão'; }
      return;
    }
    if (opt && !this.state.answered) {
      beep('click');
      this.select(+opt.dataset.index);
      return;
    }
    if (start || retry || finish) {
      beep('click');
      if (typeof this.options.onContinue === 'function') {
        this.options.onContinue({
          data: this.data,
          action: start ? 'start' : (retry ? 'retry' : 'finish')
        });
      }
    }
  };

  QuestionScreen.prototype.timesUp = function () {
    if (this.state.answered) return;
    if (this.data.type === 'order') {
      this._finishOrder(true);
      return;
    }
    this.select(-1, { timedOut: true });
  };

  QuestionScreen.prototype._complete = function (info) {
    if (this.state.answered && this.data.type !== 'match') return;
    this.state.answered = true;
    this._stopTimer();
    if (typeof this.options.onSelect === 'function') {
      this.options.onSelect(Object.assign({
        correct: true,
        points: 0,
        timedOut: false,
        data: this.data
      }, info || {}));
    }
  };

  QuestionScreen.prototype._bindReflect = function () {
    var self = this;
    var root = this.el;
    var card = root.querySelector('.qs-reflect');
    var answer = root.querySelector('[data-qs-answer]');
    var choices = Array.isArray(this.data.choices) ? this.data.choices : [];
    var hasCorrect = choices.some(function (c) { return !!c.correct; });

    function reveal(btn, ok) {
      if (btn) {
        btn.classList.add(ok ? 'is-correct' : 'is-wrong');
        btn.classList.add('is-chosen');
      }
      if (ok) {
        if (card) card.classList.add('is-revealed');
        if (answer) {
          answer.hidden = false;
          answer.classList.add('show');
        }
        var tap = root.querySelector('[data-qs-reveal]');
        if (tap) tap.hidden = true;
        root.querySelectorAll('[data-qs-choice]').forEach(function (b) {
          b.disabled = true;
          var idx = Number(b.getAttribute('data-qs-choice'));
          if (choices[idx] && choices[idx].correct) b.classList.add('is-correct');
        });
        if (!self.state.answered) {
          beep('ok');
          self._complete({ kind: 'reflect', correct: true });
        }
      } else {
        beep('nok');
        window.setTimeout(function () {
          if (btn) {
            btn.classList.remove('is-wrong', 'is-chosen');
            btn.disabled = false;
          }
        }, 700);
      }
    }

    root.querySelectorAll('[data-qs-choice]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        if (self.state.answered || btn.disabled) return;
        var idx = Number(btn.getAttribute('data-qs-choice'));
        var ok = hasCorrect ? !!(choices[idx] && choices[idx].correct) : true;
        beep('click');
        reveal(btn, ok);
      });
    });
    var tap = root.querySelector('[data-qs-reveal]');
    if (tap) {
      tap.addEventListener('click', function () {
        if (self.state.answered) return;
        beep('click');
        reveal(tap, true);
      });
    }
  };

  QuestionScreen.prototype._bindCompare = function () {
    var self = this;
    if (this.data && this.data.open) {
      self._complete({ kind: 'compare' });
      return;
    }
    var opened = {};
    var cols = this.el.querySelectorAll('[data-qs-compare]');
    cols.forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        if (e.target.closest('[data-qs-zoom]')) return;
        if (btn.classList.contains('is-open')) return;
        btn.classList.add('is-open');
        beep('click');
        var hint = btn.querySelector('.qs-compare-hint');
        var reveal = btn.querySelector('.qs-compare-reveal');
        if (hint) hint.hidden = true;
        if (reveal) reveal.hidden = false;
        opened[btn.getAttribute('data-qs-compare')] = true;
        if (Object.keys(opened).length >= cols.length) {
          beep('ok');
          self._complete({ kind: 'compare' });
        }
      });
    });
  };

  QuestionScreen.prototype._bindFicha = function () {
    this._complete({ kind: 'ficha' });
  };

  QuestionScreen.prototype._bindSteps = function () {
    var self = this;
    var root = this.el.querySelector('[data-qs-steps]');
    if (!root) return;
    var slides = Array.prototype.slice.call(root.querySelectorAll('[data-qs-step]'));
    var count = root.querySelector('[data-qs-step-count]');
    var prev = root.querySelector('[data-qs-step-prev]');
    var next = root.querySelector('[data-qs-step-next]');
    var unit = root.getAttribute('data-step-unit') || 'Exercício';
    var nextLbl = root.getAttribute('data-step-next') || 'Próximo exercício';
    var finishLbl = root.getAttribute('data-step-finish') || 'Concluir sequência';
    var i = 0;
    var total = slides.length;
    var farthest = 0; // só avança em ordem; não dá para pular exercício

    function paint() {
      slides.forEach(function (s, k) {
        var on = k === i;
        s.classList.toggle('is-on', on);
        s.hidden = !on;
      });
      if (count) count.textContent = unit + ' ' + (i + 1) + ' de ' + total;
      if (prev) prev.hidden = i <= 0;

      if (!next) return;
      if (self.state.answered) {
        next.hidden = true;
        return;
      }
      next.hidden = false;
      if (i < total - 1) {
        next.textContent = nextLbl;
        next.classList.remove('is-finish');
      } else {
        next.textContent = finishLbl;
        next.classList.add('is-finish');
      }
    }

    function goTo(n) {
      if (n < 0 || n >= total) return;
      /* Só permite voltar ou avançar um a um até onde já chegou —
         assim a seta da página não libera sem ver tudo. */
      if (n > farthest + 1) return;
      i = n;
      farthest = Math.max(farthest, i);
      paint();
    }

    if (prev) {
      prev.addEventListener('click', function () {
        beep('click');
        goTo(i - 1);
      });
    }
    if (next) {
      next.addEventListener('click', function () {
        beep('click');
        if (i < total - 1) {
          goTo(i + 1);
          return;
        }
        if (!self.state.answered) {
          beep('ok');
          root.classList.add('is-done');
          self._complete({ kind: 'steps' });
          paint();
        }
      });
    }
    paint();
  };

  QuestionScreen.prototype._bindOrder = function () {
    var self = this;
    this._seqTapped = [];
    this._seqTries = 0;
    var maxTries = Math.max(1, Number(this.data.tries) || 5);
    var retryBtn = this.el.querySelector('[data-qs-seq-retry]');

    function resetRound() {
      self._seqTapped = [];
      self.state.answered = false;
      var root = self.el.querySelector('[data-qs-root]') || self.root;
      if (root) root.classList.remove('is-feedback');
      var fb = self.el.querySelector('[data-qs-seq-fb]');
      if (fb) { fb.hidden = true; fb.textContent = ''; fb.className = 'qs-seq-fb'; }
      if (retryBtn) retryBtn.hidden = true;
      var prog = self.el.querySelector('[data-qs-seq-progress]');
      var total = (self.data.items || []).length;
      if (prog) prog.textContent = '0 de ' + total + ' selecionados';
      self.el.querySelectorAll('[data-qs-seq]').forEach(function (btn) {
        btn.classList.remove('is-picked');
        btn.style.pointerEvents = '';
        var badge = btn.querySelector('.qs-seq-badge');
        if (badge) badge.textContent = '';
      });
      if (self.options.quizScoring) self._startTimer();
    }

    this.el.querySelectorAll('[data-qs-seq]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        if (self.state.answered || btn.classList.contains('is-picked')) return;
        beep('click');
        var key = btn.getAttribute('data-qs-seq');
        self._seqTapped.push(key);
        btn.classList.add('is-picked');
        var badge = btn.querySelector('.qs-seq-badge');
        if (badge) badge.textContent = String(self._seqTapped.length);
        var prog = self.el.querySelector('[data-qs-seq-progress]');
        var total = (self.data.items || []).length;
        if (prog) prog.textContent = self._seqTapped.length + ' de ' + total + ' selecionados';
        if (self._seqTapped.length >= total) self._finishOrder(false);
      });
    });

    if (retryBtn) {
      retryBtn.addEventListener('click', function () {
        beep('click');
        resetRound();
      });
    }
    this._orderMaxTries = maxTries;
  };

  QuestionScreen.prototype._finishOrder = function (timedOut) {
    if (this.state.answered) return;
    this._stopTimer();
    var items = this.data.items || [];
    var expected = items.slice().sort(function (a, b) { return a.rank - b.rank; }).map(function (it) { return it.key; });
    var tapped = this._seqTapped || [];
    var correct = !timedOut && tapped.length === expected.length;
    if (correct) {
      for (var i = 0; i < expected.length; i++) {
        if (tapped[i] !== expected[i]) { correct = false; break; }
      }
    }
    this.el.querySelectorAll('[data-qs-seq]').forEach(function (c) {
      c.classList.add('is-picked');
      c.style.pointerEvents = 'none';
    });
    var fb = this.el.querySelector('[data-qs-seq-fb]');
    var retryBtn = this.el.querySelector('[data-qs-seq-retry]');
    var root = this.el.querySelector('[data-qs-root]') || this.root;
    if (root) root.classList.add('is-feedback');

    function shortLabel(it) {
      var t = String(it.text || '');
      var cut = t.split('—')[0].split('–')[0].split(' - ')[0].trim();
      return cut.length > 48 ? cut.slice(0, 46) + '…' : cut;
    }
    var listHtml = items.slice().sort(function (a, b) { return a.rank - b.rank; }).map(function (it) {
      return '<li>' + esc(shortLabel(it)) + '</li>';
    }).join('');

    if (correct) {
      if (fb) {
        fb.hidden = false;
        fb.className = 'qs-seq-fb is-ok';
        fb.innerHTML = 'Ordem certa!';
      }
      if (retryBtn) retryBtn.hidden = true;
      var pts = this.options.quizScoring ? this._quizPoints(true) : 0;
      beep('ok');
      this._complete({ kind: 'order', correct: true, points: pts, timedOut: false });
      return;
    }

    this._seqTries = (this._seqTries || 0) + 1;
    var maxTries = this._orderMaxTries || 5;
    var prefix = timedOut ? 'Tempo esgotado.' : 'Ordem incorreta.';
    var triesTxt = this._seqTries < maxTries
      ? ' Tentativa ' + this._seqTries + ' de ' + maxTries + '.'
      : '';
    if (fb) {
      fb.hidden = false;
      fb.className = 'qs-seq-fb is-nok';
      fb.innerHTML = esc(prefix) + triesTxt +
        '<ol class="qs-seq-fb-list" aria-label="Ordem correta">' + listHtml + '</ol>';
    }
    beep('nok');

    if (this._seqTries < maxTries) {
      if (retryBtn) retryBtn.hidden = false;
      return;
    }
    if (retryBtn) retryBtn.hidden = true;
    var pts0 = 0;
    this._complete({ kind: 'order', correct: false, points: pts0, timedOut: !!timedOut });
  };

  QuestionScreen.prototype._bindMatch = function () {
    var self = this;
    var pairs = this.data.pairs || [];
    var exOrder = pairs.map(function (_, i) { return i; });
    var bodyOrder = shuffle(exOrder);
    var matched = {};
    var matchedCount = 0;
    var selectedEx = null;
    var selectedBody = null;
    var elapsed = 0;
    this._matchTick = setInterval(function () {
      elapsed += 1;
      var el = self.el.querySelector('[data-qs-match-time]');
      if (el) el.textContent = '⏱️ ' + elapsed + 's';
    }, 1000);

    function render() {
      var exCol = self.el.querySelector('[data-qs-match-ex]');
      var bodyCol = self.el.querySelector('[data-qs-match-body]');
      if (!exCol || !bodyCol) return;
      exCol.innerHTML = '';
      bodyCol.innerHTML = '';
      exOrder.forEach(function (id) {
        var btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'qs-match-item' + (matched[id] ? ' is-matched' : '');
        btn.textContent = pairs[id].ex;
        if (matched[id]) btn.disabled = true;
        btn.addEventListener('click', function () { pick('ex', id, btn); });
        exCol.appendChild(btn);
      });
      bodyOrder.forEach(function (id) {
        var btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'qs-match-item' + (matched[id] ? ' is-matched' : '');
        btn.textContent = pairs[id].body;
        if (matched[id]) btn.disabled = true;
        btn.addEventListener('click', function () { pick('body', id, btn); });
        bodyCol.appendChild(btn);
      });
      var prog = self.el.querySelector('[data-qs-match-progress]');
      if (prog) prog.textContent = matchedCount + ' de ' + pairs.length + ' pares';
    }

    function clearSel() {
      self.el.querySelectorAll('.qs-match-item').forEach(function (el) { el.classList.remove('is-selected'); });
      selectedEx = null;
      selectedBody = null;
    }

    function pick(side, id, btn) {
      if (matched[id] || self.state.answered) return;
      beep('click');
      var sel = side === 'ex' ? '[data-qs-match-ex] .qs-match-item' : '[data-qs-match-body] .qs-match-item';
      self.el.querySelectorAll(sel).forEach(function (el) { el.classList.remove('is-selected'); });
      btn.classList.add('is-selected');
      if (side === 'ex') selectedEx = id;
      else selectedBody = id;
      if (selectedEx == null || selectedBody == null) return;
      if (selectedEx === selectedBody) {
        matched[selectedEx] = true;
        matchedCount += 1;
        clearSel();
        render();
        if (matchedCount >= pairs.length) {
          if (self._matchTick) { clearInterval(self._matchTick); self._matchTick = null; }
          var max = self.options.maxPoints != null ? Number(self.options.maxPoints) : 50;
          var pts = max;
          beep('end');
          self._complete({ kind: 'match', correct: true, points: pts, elapsed: elapsed });
        } else {
          beep('ok');
        }
      } else {
        beep('nok');
        var a = self.el.querySelector('[data-qs-match-ex] .is-selected');
        var b = self.el.querySelector('[data-qs-match-body] .is-selected');
        [a, b].forEach(function (el) {
          if (!el) return;
          el.classList.add('is-wrong');
          setTimeout(function () { el.classList.remove('is-wrong'); }, 400);
        });
        setTimeout(clearSel, 420);
      }
    }

    render();
  };

  QuestionScreen.prototype._bindRhythm = function () {
    var self = this;
    var d = this.data;
    var min = Number(d.bpmMin) || 100;
    var max = Number(d.bpmMax) || 120;
    var guide = Number(d.guideBpm) || Math.round((min + max) / 2);
    var need = Math.max(5, Number(d.taps) || 8);
    var maxTries = Math.max(1, Number(d.tries) || 5);
    var tol = d.tolerance != null ? Number(d.tolerance) : 10;   /* folga: aceita um pouco antes/depois da faixa */
    var sMin = Number(d.scaleMin) || 60;
    var sMax = Number(d.scaleMax) || 160;
    var el = this.el;
    var wrap = el.querySelector('.qs-rhythm');
    var status = el.querySelector('[data-qs-r-status]');
    var ring = el.querySelector('[data-qs-r-ring]');
    var btn = el.querySelector('[data-qs-r-btn]');
    var marker = el.querySelector('[data-qs-r-marker]');
    var bpmEl = el.querySelector('[data-qs-r-bpm]');
    var cntEl = el.querySelector('[data-qs-r-count]');
    var goBtn = el.querySelector('[data-qs-r-go]');
    var retryBtn = el.querySelector('[data-qs-r-retry]');
    if (!wrap || !btn) return;
    var phase = 'guide';
    var stamps = [];
    var tries = 0;
    var lastBpm = 0;

    function setStatus(t) { if (status) status.textContent = t; }
    function pulse() {
      if (!ring) return;
      ring.classList.remove('is-pulse');
      void ring.offsetWidth;
      ring.classList.add('is-pulse');
    }
    function bpmOf(list) {
      if (list.length < 3) return 0;
      var iv = [];
      for (var i = 1; i < list.length; i++) iv.push(list[i] - list[i - 1]);
      iv.sort(function (a, b) { return a - b; });
      var cut = Math.floor(iv.length * 0.15);
      var core = iv.slice(cut, iv.length - cut);
      if (!core.length) core = iv;
      var avg = core.reduce(function (s, v) { return s + v; }, 0) / core.length;
      return 60000 / avg;
    }
    function show(bpm) {
      if (bpmEl) bpmEl.textContent = bpm ? Math.round(bpm) + ' por minuto' : '— por minuto';
      if (cntEl) cntEl.textContent = stamps.length + ' de ' + need + ' toques';
      if (marker) {
        if (!bpm) { marker.hidden = true; return; }
        marker.hidden = false;
        var p = Math.max(0, Math.min(100, ((bpm - sMin) / (sMax - sMin)) * 100));
        marker.style.left = p + '%';
      }
    }
    function setPhase(p) { phase = p; wrap.setAttribute('data-qs-r-phase', p); }
    /* orientação ao vivo enquanto a pessoa toca */
    function coach(bpm) {
      if (!bpm || stamps.length < 3) return;
      if (bpm < min - tol) setStatus('Um pouco mais rápido! Acompanhe a pulsação.');
      else if (bpm > max + tol) setStatus('Mais devagar! Espere a pulsação para tocar.');
      else setStatus('Isso! Continue assim, nesse ritmo.');
    }

    function startGuide() {
      setPhase('guide');
      stamps = [];
      show(0);
      if (goBtn) goBtn.hidden = false;
      if (retryBtn) retryBtn.hidden = true;
      setStatus('Passo 1: toque no botão junto com a pulsação. Quando se sentir seguro, clique em "Já peguei o ritmo".');
      self._rGuide = setInterval(function () { pulse(); beep('tick'); }, 60000 / guide);
      pulse(); beep('tick');
    }
    function stopGuide() {
      if (self._rGuide) { clearInterval(self._rGuide); self._rGuide = null; }
    }
    function startTest() {
      stopGuide();
      setPhase('test');
      stamps = [];
      show(0);
      if (goBtn) goBtn.hidden = true;
      if (retryBtn) retryBtn.hidden = true;
      setStatus('Passo 2: continue tocando, ' + need + ' vezes. A pulsação segue como apoio, sem som.');
      self._rGuide = setInterval(pulse, 60000 / guide);   /* apoio visual, sem "tic" */
    }
    function finish() {
      var bpm = bpmOf(stamps);
      lastBpm = bpm;
      show(bpm);
      tries += 1;
      var ok = bpm >= min - tol && bpm <= max + tol;
      setPhase('result');
      if (ok) {
        setStatus('Ritmo certo! ' + Math.round(bpm) + ' por minuto. O ideal na RCP é de ' + min + ' a ' + max + '.');
        beep('end');
        var pts = self.options.quizScoring ? self._quizPoints(true) : 0;
        self._complete({ kind: 'rhythm', correct: true, points: pts, bpm: Math.round(bpm) });
        return;
      }
      var msg = bpm < min ? 'Ainda lento' : 'Ainda rápido';
      msg += ': ' + Math.round(bpm) + ' por minuto. Tente de novo, o ideal é de ' + min + ' a ' + max + '.';
      beep('nok');
      if (tries >= maxTries) {
        setStatus(msg + ' Depois revise o ritmo com o guia.');
        var pts0 = 0;
        self._complete({ kind: 'rhythm', correct: false, points: pts0, bpm: Math.round(bpm) });
      } else {
        setStatus(msg + ' Tentativa ' + tries + ' de ' + maxTries + '.');
        if (retryBtn) retryBtn.hidden = false;
      }
    }
    function tap(ev) {
      if (self.state.answered && phase === 'result') return;
      if (phase === 'result') return;
      if (ev && ev.preventDefault) ev.preventDefault();
      var now = (window.performance && performance.now) ? performance.now() : Date.now();
      btn.classList.add('is-down');
      setTimeout(function () { btn.classList.remove('is-down'); }, 90);
      pulse();
      beep('tick');
      if (stamps.length && now - stamps[stamps.length - 1] > 2000) stamps = [];
      stamps.push(now);
      if (phase === 'guide') {
        if (stamps.length > 6) stamps.shift();
        show(bpmOf(stamps));
        coach(bpmOf(stamps));
        return;
      }
      show(bpmOf(stamps));
      coach(bpmOf(stamps));
      if (stamps.length >= need) finish();
    }

    btn.addEventListener('pointerdown', tap);
    btn.addEventListener('keydown', function (ev) {
      if (ev.repeat) return;
      if (ev.key === ' ' || ev.key === 'Enter') tap(ev);
    });
    /* clique sintético/teclado já tratado; evita duplo disparo */
    btn.addEventListener('click', function (ev) { ev.preventDefault(); });
    if (goBtn) goBtn.addEventListener('click', startTest);
    if (retryBtn) retryBtn.addEventListener('click', startGuide);

    this._rhythmStop = stopGuide;
    startGuide();
  };

  QuestionScreen.prototype.select = function (index, extra) {
    if (this.state.answered) return;
    extra = extra || {};
    var alts = this.data.alternatives || [];
    var timedOut = !!extra.timedOut || index < 0;
    if (!timedOut && (index < 0 || index >= alts.length)) return;

    this._stopTimer();
    this.state.answered = true;
    var cfBtn = this.el.querySelector('[data-qs-confirm]');
    if (cfBtn) cfBtn.hidden = true;
    this.state.selectedIndex = timedOut ? null : index;
    var opinion = !!this.data.opinion;
    var chosen = timedOut ? null : alts[index];
    var correctIndex = alts.findIndex(function (a) { return !!a.correct; });
    var isCorrect = timedOut ? false : (opinion ? true : !!(chosen && chosen.correct));
    this.state.correct = isCorrect;
    var pts = this.options.quizScoring ? this._quizPoints(isCorrect) : 0;
    this.state.points = pts;

    var buttons = this.el.querySelectorAll('.qs-opt');
    buttons.forEach(function (btn, i) {
      btn.disabled = true;
      btn.classList.add('is-revealed');
      if (!timedOut && i === index) btn.classList.add('is-selected');
      if (opinion) {
        if (i === index) {
          btn.classList.add('is-correct');
          btn.querySelector('.qs-mark').textContent = '✓';
        } else {
          btn.classList.add('is-dim');
        }
        return;
      }
      if (isCorrect && i === correctIndex) {
        btn.classList.add('is-correct');
        btn.querySelector('.qs-mark').textContent = '✓';
      } else if (!timedOut && i === index) {
        btn.classList.add('is-wrong');
        btn.querySelector('.qs-mark').textContent = '✕';
      } else {
        btn.classList.add('is-dim');
      }
    });

    var media = this.el.querySelector('.qs-media');
    if (media) {
      media.classList.remove('is-ok', 'is-nok');
      media.classList.add('is-answered', isCorrect ? 'is-ok' : 'is-nok');
    }

    var result = this.el.querySelector('[data-qs-result]');
    if (result) {
      result.hidden = false;
      var resultText = result.querySelector('[data-qs-result-text]');
      var label = 'Não foi dessa vez';
      if (opinion) label = 'Registrado';
      else if (timedOut) label = 'Tempo esgotado';
      else if (isCorrect) label = pts ? ('Acertou · +' + pts) : 'Acertou';
      if (resultText) resultText.textContent = label;
    }

    var explain = this.el.querySelector('[data-qs-explain]');
    if (explain) {
      var explainText = this.data.explanation || '';
      if (explainText) {
        explain.textContent = explainText;
        explain.classList.add('show', isCorrect ? 'is-ok' : 'is-nok');
      }
    }

    beep(isCorrect ? 'ok' : 'nok');

    if (typeof this.options.onSelect === 'function') {
      this.options.onSelect({
        correct: isCorrect,
        selectedIndex: this.state.selectedIndex,
        points: pts,
        timedOut: timedOut,
        data: this.data
      });
    }
  };

  QuestionScreen.prototype.destroy = function () {
    this._stopTimer();
    if (this._rhythmStop) { this._rhythmStop(); this._rhythmStop = null; }
    if (this._matchTick) {
      clearInterval(this._matchTick);
      this._matchTick = null;
    }
    var vid = this.el.querySelector('video');
    if (vid) { try { vid.pause(); } catch (e) {} }
    if (this._videoGuard) {
      clearTimeout(this._videoGuard.snapTimer);
      clearTimeout(this._videoGuard.seekTimer);
      clearTimeout(this._videoGuard.backTimer);
      this._videoGuard = null;
    }
    this._pandaPlayer = null;
    if (this._onVideoMsg) {
      window.removeEventListener('message', this._onVideoMsg);
      this._onVideoMsg = null;
    }
    this.el.removeEventListener('click', this._onClick);
    this.el.innerHTML = '';
  };

  global.QuestionScreen = QuestionScreen;
})(typeof window !== 'undefined' ? window : globalThis);
