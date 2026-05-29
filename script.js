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