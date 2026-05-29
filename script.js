tailwind.config = {
            theme: {
                extend: {
                    fontFamily: {
                        sans: ['Inter', 'sans-serif'],
                        display: ['Oswald', 'sans-serif'],
                    },
                    fontSize: {
                        '7.5xl': ['5rem', { lineHeight: '1' }],
                    },
                    colors: {
                        spsOrange: {
                            DEFAULT: '#F25A22',
                            hover: '#d94712',
                            light: '#ffeedb'
                        },
                        spsDark: '#0E0F11',
                        spsCard: '#181A1F',
                        spsBorder: '#2E323D'
                    }
                }
            }
        }

(function(){try{
  var slug="lp-mpqwqgvr-fl8mi";
  var SK='lp_access_'+slug;
  var map={access_token:'lp_pw_',allowlist_access_token:'lp_al_',pin_access_token:'lp_pin_',paywall_access_token:'lp_paid_'};
  var u=new URL(location.href);var found=null;var changed=false;
  Object.keys(map).forEach(function(p){var v=u.searchParams.get(p);if(v){found=v;try{localStorage.setItem(map[p]+slug,v);}catch(e){}u.searchParams.delete(p);changed=true;}});
  if(found){try{sessionStorage.setItem(SK,found);}catch(e){}}
  else{try{if(!sessionStorage.getItem(SK)){var t=localStorage.getItem('lp_pw_'+slug)||localStorage.getItem('lp_al_'+slug)||localStorage.getItem('lp_pin_'+slug)||localStorage.getItem('lp_paid_'+slug);if(t)sessionStorage.setItem(SK,t);}}catch(e){}}
  if(changed){try{history.replaceState(null,'',u.toString());}catch(e){}}

  // Auto-attach gate token to:
  //   1. sheet-rows writes (PATCH/POST/PUT/DELETE)
  //   2. LLM proxy calls (POST/GET) — /api/landing-pages/public/<slug>/llm/...
  //   3. landing-page LLM config probes (GET) — same prefix
  // So AI-generated pages don't have to know about the X-Landing-Page-Token header.
  function getTok(){try{return sessionStorage.getItem(SK)||localStorage.getItem('lp_pw_'+slug)||localStorage.getItem('lp_al_'+slug)||localStorage.getItem('lp_pin_'+slug)||localStorage.getItem('lp_paid_'+slug);}catch(e){return null;}}
  function needsToken(url,method){if(!url)return false;var s=String(url);var m=(method||'GET').toUpperCase();var isSheetWrite=(m==='POST'||m==='PATCH'||m==='PUT'||m==='DELETE')&&/\/sheet-rows(\/|$|\?)/.test(s);var isLlm=/\/api\/landing-pages\/public\/[^/]+\/(llm|llm-config)(\/|$|\?)/.test(s);return isSheetWrite||isLlm;}
  if(window.fetch){var _f=window.fetch;window.fetch=function(input,init){try{var url=typeof input==='string'?input:(input&&input.url)||'';var method=(init&&init.method)||(input&&input.method)||'GET';if(needsToken(url,method)){var tok=getTok();if(tok){init=init||{};var h=new Headers(init.headers||(typeof input!=='string'?input.headers:undefined)||{});if(!h.has('X-Landing-Page-Token'))h.set('X-Landing-Page-Token',tok);init.headers=h;}}}catch(e){}return _f.call(this,input,init);};}
  if(window.XMLHttpRequest){var _o=XMLHttpRequest.prototype.open;var _s=XMLHttpRequest.prototype.send;XMLHttpRequest.prototype.open=function(m,u){this.__lpM=m;this.__lpU=u;return _o.apply(this,arguments);};XMLHttpRequest.prototype.send=function(){try{if(needsToken(this.__lpU,this.__lpM)){var tok=getTok();if(tok)this.setRequestHeader('X-Landing-Page-Token',tok);}}catch(e){}return _s.apply(this,arguments);};}
}catch(e){}})();

function toggleMobileMenu() {
            const menu = document.getElementById('mobile-menu');
            const icon = document.getElementById('menu-icon');
            if(menu.classList.contains('hidden')) {
                menu.classList.remove('hidden');
                icon.className = "fa-solid fa-xmark";
            } else {
                menu.classList.add('hidden');
                icon.className = "fa-solid fa-bars";
            }
        }

        function updateSlider(pctValue) {
            const beforeLayer = document.getElementById('before-layer');
            const handleBar = document.getElementById('slider-handle-bar');
            const cleanValue = Math.min(Math.max(pctValue, 0), 100);
            beforeLayer.style.width = `${cleanValue}%`;
            handleBar.style.left = `${cleanValue}%`;
            document.getElementById('slider-input').value = cleanValue;
        }

        window.addEventListener('load', () => {
            updateSlider(50);
        });

        function showToast(message, type = "success") {
            const container = document.getElementById('toast-container');
            const toast = document.createElement('div');
            toast.className = `p-4 rounded-lg shadow-2xl border flex items-center gap-3 text-sm font-semibold tracking-wide uppercase transition-all duration-300 transform translate-y-2 opacity-0 pointer-events-auto max-w-sm ${
                type === "success"
                ? "bg-[#14231b] border-emerald-500/30 text-emerald-400"
                : "bg-[#2b1613] border-spsOrange/30 text-spsOrange"
            }`;
            const icon = type === "success"
                ? '<i class="fa-solid fa-circle-check text-lg"></i>'
                : '<i class="fa-solid fa-triangle-exclamation text-lg"></i>';
            toast.innerHTML = `
                ${icon}
                <div class="flex-1">${message}</div>
                <button class="text-white hover:opacity-75 focus:outline-none">&times;</button>
            `;
            container.appendChild(toast);
            setTimeout(() => {
                toast.classList.remove('translate-y-2', 'opacity-0');
            }, 10);
            const autoRemove = setTimeout(() => {
                dismissToast(toast);
            }, 5000);
            toast.querySelector('button').addEventListener('click', () => {
                clearTimeout(autoRemove);
                dismissToast(toast);
            });
        }

        function dismissToast(toastElement) {
            toastElement.classList.add('translate-y-2', 'opacity-0');
            setTimeout(() => {
                if(toastElement.parentNode) {
                    toastElement.parentNode.removeChild(toastElement);
                }
            }, 300);
        }

        function selectService(serviceId) {
            const contactServiceDropdown = document.getElementById('contact-service');
            contactServiceDropdown.value = serviceId;
            const textDetails = document.getElementById('contact-details');
            const readableService = serviceId.replace('-', ' ').toUpperCase();
            textDetails.value = `I am interested in requesting a quote for: ${readableService}.\n\n[Please enter any details regarding size, location, and desired completion dates here]`;
            showToast(`Selected ${readableService} service for your quote inquiry!`, "success");
            const contactSection = document.getElementById('contact');
            if(contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
                setTimeout(() => {
                    document.getElementById('contact-name').focus();
                }, 800);
            }
        }

        function openReviewModal() {
            document.getElementById('review-modal').classList.remove('hidden');
        }

        function closeReviewModal() {
            document.getElementById('review-modal').classList.add('hidden');
        }

        function setRating(val) {
            document.getElementById('new-review-rating').value = val;
            const stars = document.querySelectorAll('.star-btn');
            stars.forEach((star, index) => {
                if (index < val) {
                    star.classList.add('text-spsOrange');
                    star.classList.remove('text-gray-600');
                } else {
                    star.classList.remove('text-spsOrange');
                    star.classList.add('text-gray-600');
                }
            });
        }

        function submitCustomReview(e) {
            e.preventDefault();
            const ratingValue = parseInt(document.getElementById('new-review-rating').value);
            const reviewerName = document.getElementById('new-review-name').value;
            const serviceCategory = document.getElementById('new-review-service').value;
            const reviewComment = document.getElementById('new-review-text').value;
            const testimonialsGrid = document.getElementById('testimonials-grid');
            const newCard = document.createElement('div');
            newCard.className = "bg-spsCard p-6 rounded-xl border border-spsOrange/40 space-y-4 flex flex-col justify-between transform hover:-translate-y-1 transition duration-300";
            let starHtml = '';
            for(let i=0; i < 5; i++) {
                if (i < ratingValue) {
                    starHtml += '<i class="fa-solid fa-star"></i>';
                } else {
                    starHtml += '<i class="fa-regular fa-star text-gray-600"></i>';
                }
            }
            newCard.innerHTML = `
                <div class="space-y-3 font-sans">
                    <div class="flex text-spsOrange text-sm">
                        ${starHtml}
                    </div>
                    <p class="text-gray-300 text-sm italic">
                        "${reviewComment}"
                    </p>
                </div>
                <div class="border-t border-spsBorder/60 pt-4 flex items-center justify-between font-sans">
                    <div>
                        <h4 class="font-bold text-white text-sm">${reviewerName}</h4>
                        <span class="text-xs text-gray-500">${serviceCategory}</span>
                    </div>
                    <span class="bg-spsOrange/10 text-spsOrange font-mono text-[10px] px-2 py-0.5 rounded">User Posted</span>
                </div>
            `;
            testimonialsGrid.insertBefore(newCard, testimonialsGrid.firstChild);
            closeReviewModal();
            document.getElementById('new-review-name').value = '';
            document.getElementById('new-review-text').value = '';
            setRating(5);
            showToast("Thank you for your feedback! Review posted to live preview catalog.", "success");
        }

        function handleSecureSubmit(e) {
            e.preventDefault();
            const fullName = document.getElementById('contact-name').value;
            const phoneNumber = document.getElementById('contact-phone').value;
            const email = document.getElementById('contact-email').value;
            const service = document.getElementById('contact-service').value;
            const address = document.getElementById('contact-address').value;
            const details = document.getElementById('contact-details').value;
            const clientQuoteRequest = {
                id: 'SPS_' + Date.now(),
                fullName, phoneNumber, email, service, address, details,
                timestamp: new Date().toISOString()
            };
            try {
                let requests = JSON.parse(localStorage.getItem('sps_quote_requests') || '[]');
                requests.push(clientQuoteRequest);
                localStorage.setItem('sps_quote_requests', JSON.stringify(requests));
            } catch(err) {
                console.error("Local storage limits write:", err);
            }
            document.getElementById('secure-booking-form').reset();
            document.getElementById('estimate-tag').innerText = '';
            showToast(`Thank you, ${fullName}! Your inquiry has been securely cataloged. Direct staff will contact you at ${phoneNumber}.`, "success");
        }