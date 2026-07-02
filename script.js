const notice=document.querySelector('.notice');
    const formatHint=document.querySelector('.format-hint');
    const revealItems=document.querySelectorAll('main section:not(.hero),.facts,.faq-bg,footer');
    revealItems.forEach(item=>item.classList.add('reveal'));
    if('IntersectionObserver' in window){
      const revealObserver=new IntersectionObserver(entries=>{
        entries.forEach(entry=>{
          if(entry.isIntersecting){
            entry.target.classList.add('is-visible');
            revealObserver.unobserve(entry.target);
          }
        });
      },{threshold:.08,rootMargin:'0px 0px -45px'});
      revealItems.forEach(item=>revealObserver.observe(item));
    }else{
      revealItems.forEach(item=>item.classList.add('is-visible'));
    }
    document.querySelectorAll('.speaker-link').forEach(link=>link.addEventListener('click',()=>{
      const card=document.querySelector(link.getAttribute('href'));
      document.querySelectorAll('.speaker.is-highlighted').forEach(item=>item.classList.remove('is-highlighted'));
      if(card){
        card.classList.add('is-highlighted');
        setTimeout(()=>card.classList.remove('is-highlighted'),2000);
      }
    }));
    document.querySelectorAll('input[name="format"]').forEach(input=>input.addEventListener('change',()=>{
      formatHint.textContent=input.value==='online'
        ? 'Пришлем ссылку на трансляцию на почту за час до начала'
        : 'Количество мест ограничено';
    }));
    document.querySelectorAll('.js-form').forEach(form=>form.addEventListener('submit',e=>{e.preventDefault();notice.classList.add('show');form.reset();if(formatHint)formatHint.textContent='Пришлем ссылку на трансляцию на почту за час до начала';setTimeout(()=>notice.classList.remove('show'),3000)}));
    const header=document.querySelector('.top');
    const menuToggle=document.querySelector('.menu-toggle');
    const closeMenu=()=>{
      if(!header||!menuToggle)return;
      header.classList.remove('menu-open');
      menuToggle.setAttribute('aria-expanded','false');
      menuToggle.setAttribute('aria-label','Открыть меню');
    };
    if(header&&menuToggle){
      menuToggle.addEventListener('click',()=>{
        const isOpen=header.classList.toggle('menu-open');
        menuToggle.setAttribute('aria-expanded',String(isOpen));
        menuToggle.setAttribute('aria-label',isOpen?'Закрыть меню':'Открыть меню');
      });
      header.querySelectorAll('.nav a').forEach(link=>link.addEventListener('click',closeMenu));
      document.addEventListener('click',event=>{
        if(header.classList.contains('menu-open')&&!header.contains(event.target))closeMenu();
      });
      window.addEventListener('resize',()=>{if(window.innerWidth>800)closeMenu()});
    }
