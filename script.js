window.addEventListener('DOMContentLoaded', function() {

    // Tabs

    let tabs = document.querySelectorAll('.tabheader__item'),
        tabContent = document.querySelectorAll('.tabcontent'),
        tabsParent = document.querySelector('.tabheader__items')

    function hideTabContent () {
        tabs.forEach(i => {
            i.classList.remove('tabheader__item_active')
        })

        tabContent.forEach(i => {
            i.classList.add('hide')
            i.classList.remove('show', 'fade')
        })
    }

    function showTabContent (i = 0) {
        tabContent[i].classList.remove('hide')
        tabContent[i].classList.add('show', 'fade')

        tabs[i].classList.add('tabheader__item_active')
    }

    hideTabContent()
    showTabContent()

    tabsParent.addEventListener('click', (e) => {
        const target = e.target

        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent()
                    showTabContent(i)
                }
            })
        }
    })

    // Timer

    const deadline = '2023-09-27'

    function getTimeRemaining (endtime) {
        let days, hours, minutes, seconds

        let t = Date.parse(new Date(endtime)) - Date.parse(new Date())

        if ( t > 0) {
            days = Math.floor(t / (1000 * 60 * 60 * 24) % 365)
            hours = Math.floor((t / (1000 * 60 * 60 )) % 24)
            minutes = Math.floor(t / (1000 * 60 )  % 60)
            seconds = Math.floor((t / 1000) % 60)

            return {
                t, days, hours, minutes, seconds
            }
        } 
        else {
            return {
                'total': 0,
                'days': 0,
                'hours': 0,
                'minutes': 0,
                'seconds': 0
            }
        }
    }

    function getZero (num) {
        if (num < 10) {
            return `0${num}`
        } else return num
    }

    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000)
        updateClock()

        function updateClock () {
            const t = getTimeRemaining(endtime)

            days.innerHTML = getZero(t.days) 
            hours.innerHTML = getZero(t.hours)
            minutes.innerHTML = getZero(t.minutes)
            seconds.innerHTML = getZero(t.seconds)

            if (t.total < 1) {
                clearInterval(timeInterval)
            }
        }
    }
    
    setClock('.timer', deadline)

    // Создание карточек

    class CreateMenu {
        constructor () {

        }

    }

    // Forms
    const modal = document.querySelector('.modal'),
          modalTrigger = document.querySelectorAll('[data-modal]')
          modalCloseBtn = document.querySelector('[data-close]')

    function openModal () {
        modal.classList.add('show')
        document.body.style.overflow = 'hidden'
    }

    function closeModal () {
        modal.classList.remove('show')
        document.body.style.overflow = ''

    }

    modalTrigger.forEach(btn => {
            btn.addEventListener('click', e => {
                openModal()
            })

    })

    modalCloseBtn.addEventListener('click', e => {
        closeModal()
    })

    modal.addEventListener('click', e => {
        if (e.target === modal) {
            closeModal()
        }
    })

    document.addEventListener('keydown', e => {
        if (e.code === 'Escape' && modal.classList.contains('show')) {
            closeModal()
        }
    })

     
    // Slider
    const countainer = document.querySelector('.offer__slider'),
          prev = document.querySelector('.offer__slider-prev'),
          next = document.querySelector('.offer__slider-next'),
          currentSlide = document.querySelector('#current'),
          totalSlides = document.querySelector('#total'),
          slidesWrapper = document.querySelector('.offer__slider-wrapper'),
          slidesField = document.querySelector('.offer__slider-inner'),
          sliders = document.querySelectorAll('.offer__slide'),
          width = window.getComputedStyle(slidesWrapper).width

    let activeSlide = 1
    let offset = 0

    function deleteNotDigits (str) {
        return +str.replace(/\D/g, '')
    }

    slidesField.style.width = 100 * sliders.length + '%'
    slidesField.style.display = 'flex'
    slidesField.style.transition = '0.5s all'

    slidesWrapper.style.overflow = 'hidden'
    
    prev.addEventListener('click', () => {
        if (offset == 0) {
            offset = deleteNotDigits(width) * (sliders.length - 1)
        } else {
            offset -= deleteNotDigits(width)
        }

        slidesField.style.transform = `translateX(-${offset}px)`

        if (activeSlide == 1) {
            activeSlide = sliders.length
            currentSlide.innerHTML = getZero(activeSlide)
        } else {
            activeSlide --
            currentSlide.innerHTML = getZero(activeSlide)
        }
    })

    next.addEventListener('click', () => {
        if (offset == deleteNotDigits(width) * (sliders.length - 1)) {
            offset = 0
        } else {
            offset += deleteNotDigits(width)
        }

        slidesField.style.transform = `translateX(-${offset}px)`

        if (activeSlide == sliders.length) {
            activeSlide = 1
            currentSlide.innerHTML = getZero(activeSlide)
        } else {
            activeSlide ++
            currentSlide.innerHTML = getZero(activeSlide)
        }
    })

    
    // Calc

})