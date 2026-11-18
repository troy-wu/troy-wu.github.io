/* The part of the journal that lives in the database (the same Firebase Realtime Database as the basketball board).
   Entries written in the editor (journal/edit/) are kept there as plain text:

     journal/drafts/<id>      the working copy of every entry; only Troy can read or write it
     journal/published/<id>   the copy visitors see; written when "Publish" is pressed
     journal/images/<id>      one picture each, as a data: address; an entry points at it with ![caption](db:<id>)

   This file is shared by the journal page and the editor. It only reads; the editor does the writing. */
(function () {
  'use strict';
  var URL = 'https://troy-wu-default-rtdb.firebaseio.com/journal';
  var pics = {};

  function getJSON(path, auth) {
    return fetch(URL + '/' + path + '.json' + (auth ? '?auth=' + encodeURIComponent(auth) : ''), { cache: 'no-store' })
      .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); });
  }

  /* one picture's data: address, fetched once */
  function pic(id) {
    if (!pics[id]) pics[id] = getJSON('images/' + encodeURIComponent(id)).then(function (v) {
      if (typeof v !== 'string' || v.indexOf('data:image/') !== 0) throw new Error('no picture');
      return v;
    });
    pics[id].catch(function () { delete pics[id]; });
    return pics[id];
  }
  function remember(id, data) { pics[id] = Promise.resolve(data); }

  /* point an <img> at a picture: "db:<id>" comes from the database, anything else is an ordinary address */
  function setSrc(img, src) {
    var m = /^db:([\w-]+)$/.exec(src || '');
    if (!m) { img.src = src; return; }
    img.setAttribute('data-db', m[1]);
    pic(m[1]).then(function (data) { img.src = data; }, function () { img.alt = img.alt || 'This picture did not load.'; });
  }

  /* Markdown → nodes, with database pictures filled in as they arrive.
     The HTML is built in a <template>, so nothing tries to load a "db:" address. */
  function nodes(md) {
    var t = document.createElement('template');
    t.innerHTML = window.marked.parse(md || '', { gfm: true, breaks: true });
    Array.prototype.forEach.call(t.content.querySelectorAll('img'), function (img) {
      var src = img.getAttribute('src') || '';
      if (/^db:/.test(src)) { img.removeAttribute('src'); setSrc(img, src); }
    });
    return t.content;
  }

  /* "2026-11-16" → "Nov 16, 2026"; anything else is shown as written */
  var MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  function niceDate(d) {
    var m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(d || '');
    return m ? MONTHS[+m[2] - 1] + ' ' + (+m[3]) + ', ' + m[1] : (d || '');
  }

  /* the published entries, newest first: [{ id, title, date, body, when }] ("when" is a number to sort by) */
  function published() {
    return getJSON('published').then(function (all) {
      return Object.keys(all || {}).map(function (id) {
        var p = all[id] || {};
        return { id: id, title: String(p.title || 'Untitled'), date: niceDate(p.date), body: String(p.body || ''), when: Date.parse(p.date) || p.publishedAt || 0 };
      }).sort(function (a, b) { return b.when - a.when; });
    });
  }

  window.JournalDB = { url: URL, getJSON: getJSON, pic: pic, remember: remember, setSrc: setSrc, nodes: nodes, niceDate: niceDate, published: published };
})();
