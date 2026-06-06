document.addEventListener('DOMContentLoaded', () => {
    
    /* ==========================================================================
       MOBILE MENU DRAWER
       ========================================================================== */
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (hamburgerBtn && navMenu) {
        hamburgerBtn.addEventListener('click', () => {
            const isOpen = navMenu.classList.toggle('open');
            hamburgerBtn.classList.toggle('open');
            document.body.style.overflow = isOpen ? 'hidden' : 'auto';
        });

        // Close menu when clicking navigation links
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('open');
                hamburgerBtn.classList.remove('open');
                document.body.style.overflow = 'auto';
            });
        });
    }

    /* ==========================================================================
       REAL TESTIMONIALS STATE DATABASE & DYNAMIC SWAPPER
       ========================================================================== */
    const clientsData = {
        bob: {
            id: 'bob',
            name: 'Bob',
            goal: 'Lose Love Handles & Get Ripped',
            badgeGoal: 'Get Ripped',
            timeframe: '12 Weeks',
            quote: 'Bob has well and truly SMASHED his 12-week programme. Single-digit body fat %, down from trouser size 36 to 32, strongest he has ever been, and the most knowledgeable he has ever been. Having left no stone unturned, his high standards have shone.',
            instagram: '',
            instagramLink: '#',
            postLink: 'https://www.instagram.com/jdavis_coaching/p/DLfpM-QsQps/',
            imageThumb: 'images/transformation_bob.png',
            imageBefore: 'images/transformation_bob_before.png',
            imageAfter: 'images/transformation_bob_after.png'
        },
        chris: {
            id: 'chris',
            name: 'Chris Stanton',
            goal: 'Lose 15kg (33lbs) Fat',
            badgeGoal: '-15kg (33lbs)',
            timeframe: '12 Weeks | Business Owner',
            quote: 'Chris came to me adamant that this would be the time he achieves his dream physique. Despite family bereavements two weeks in, and running two busy businesses with very limited time, he didn\'t quit. He fell in love with the structure, routine, and dropped 15kg of fat.',
            instagram: '@chrisstanton01',
            instagramLink: 'https://www.instagram.com/chrisstanton01/',
            postLink: 'https://www.instagram.com/jdavis_coaching/p/DNv2kTjWJl8/',
            imageThumb: 'images/transformation_chris.png',
            imageBefore: 'images/transformation_chris_before.png',
            imageAfter: 'images/transformation_chris_after.png'
        },
        craig: {
            id: 'craig',
            name: 'Craig',
            goal: 'Master Food & Gym Intensity',
            badgeGoal: 'Body Recomp',
            timeframe: '12 Weeks | Elite Recomp',
            quote: 'Craig came to me wanting to achieve his absolute best physique. We mastered tracking food and gym intensity together. Not only has he achieved the look he wanted, but his life has changed—getting out of bed, productivity, drive, work ethic, and relationships.',
            instagram: '@thecraigus',
            instagramLink: 'https://www.instagram.com/thecraigus/',
            postLink: 'https://www.instagram.com/jdavis_coaching/p/DNLvYMXsAK1/',
            imageThumb: 'images/transformation_craig.png',
            imageBefore: 'images/transformation_craig_before.png',
            imageAfter: 'images/transformation_craig_after.png'
        },
        ethan: {
            id: 'ethan',
            name: 'Ethan Baxter',
            goal: 'Lost 1 Stone 3lbs (17lbs)',
            badgeGoal: '-1 Stone 3lbs',
            timeframe: '12 Weeks | Holiday Prep',
            quote: 'Ethan wanted to get peeled for his holiday. Having tried the usual keto nonsense with endless cardio, he was stuck. Introducing Ethan to high-carb structured eating, we fueled him properly to build/retain muscle while melting the fat. He was a robot to the plan.',
            instagram: '@ethanlbaxter',
            instagramLink: 'https://www.instagram.com/ethanlbaxter/',
            postLink: 'https://www.instagram.com/jdavis_coaching/p/DYxY6PtDE8L/',
            imageThumb: 'images/transformation_ethan.png',
            imageBefore: 'images/transformation_ethan_before.png',
            imageAfter: 'images/transformation_ethan_after.png'
        },
        xavier: {
            id: 'xavier',
            name: 'Xavier Roy',
            goal: 'Beginner Shred',
            badgeGoal: '-10kg (22lbs)',
            timeframe: '12 Weeks',
            quote: 'Prior to starting, Xavier had no gym experience, never cooked, and never tracked food. With the right plan, guidance, and structure, we completely transformed his body from a keyboard 10,000 miles away.',
            instagram: '@its.xavierroy',
            instagramLink: 'https://www.instagram.com/its.xavierroy/',
            postLink: 'https://www.instagram.com/jdavis_coaching/p/DYKyzNeDEkl/',
            imageThumb: 'images/transformation_xavier.png',
            imageBefore: 'images/transformation_xavier_before.png',
            imageAfter: 'images/transformation_xavier_after.png'
        },
        leah: {
            id: 'leah',
            name: 'Leah',
            goal: 'Food Relationship & Fat Loss',
            badgeGoal: '-86lbs (39kg)',
            timeframe: 'Fat Loss Phase',
            quote: 'Leah had made some progress but was using weight-loss jabs, believing starving herself was the only way forward. We did the opposite: more food, more fuel, and more trust. She rebuilt her relationship with food and went from 236lbs to 150lbs.',
            instagram: '',
            instagramLink: '#',
            postLink: 'https://www.instagram.com/jdavis_coaching/p/DTYa5a_DJJx/',
            imageThumb: 'images/transformation_leah.png',
            imageBefore: 'images/transformation_leah_before.png',
            imageAfter: 'images/transformation_leah_after.png'
        },
        tom: {
            id: 'tom',
            name: 'Tom Smith',
            goal: 'Wedding Day Shred & Night Shifts',
            badgeGoal: '-2 Stone (28lbs)',
            timeframe: 'Wedding Prep',
            quote: 'Tom came to me wanting to get in shape for his wedding but had fallen out of love with the gym, with low confidence and feeling shite. Despite working demanding on-call night shifts, he nailed his calories/macros and workouts to drop 2 stone.',
            instagram: '@tom_smithx1',
            instagramLink: 'https://www.instagram.com/tom_smithx1/',
            postLink: 'https://www.instagram.com/jdavis_coaching/p/DWzDOHRDFpZ/',
            imageThumb: 'images/transformation_tom.png',
            imageBefore: 'images/transformation_tom_before.png',
            imageAfter: 'images/transformation_tom_after.png'
        }
    };

    let featuredClientId = 'bob';
    let rightStackIds = ['chris', 'craig', 'ethan', 'xavier', 'leah', 'tom'];

    const slider = document.getElementById('before-after-slider');
    const handle = document.getElementById('slider-handle');
    const beforeContainer = document.getElementById('before-image-container');
    const testimonialsGrid = document.getElementById('testimonials-grid');

    // Sync width of clipped "before" image to match slider size
    const syncBeforeImageWidth = () => {
        if (slider && beforeContainer) {
            const beforeImg = beforeContainer.querySelector('img');
            if (beforeImg) {
                beforeImg.style.width = `${slider.offsetWidth}px`;
            }
        }
    };

    const renderTransformations = () => {
        // 1. Update Left Featured Client (Slider & Info text)
        const featured = clientsData[featuredClientId];
        
        const sliderBeforeImg = document.getElementById('slider-before-img');
        const sliderAfterImg = document.getElementById('slider-after-img');
        const featuredName = document.getElementById('featured-client-name');
        const featuredStat = document.getElementById('featured-client-stat');
        const featuredQuote = document.getElementById('featured-client-quote');
        const featuredInstaLink = document.getElementById('featured-client-insta-link');
        
        if (sliderBeforeImg && sliderAfterImg) {
            sliderBeforeImg.src = featured.imageBefore;
            sliderAfterImg.src = featured.imageAfter;
            sliderBeforeImg.alt = `${featured.name} Before`;
            sliderAfterImg.alt = `${featured.name} After`;
        }
        
        if (featuredName) featuredName.textContent = `Featured Client: ${featured.name}`;
        if (featuredStat) featuredStat.textContent = `Goal: ${featured.goal} | Timeframe: ${featured.timeframe}`;
        if (featuredQuote) featuredQuote.textContent = `"${featured.quote}"`;
        if (featuredInstaLink) {
            featuredInstaLink.href = featured.postLink || '#';
        }
        
        // Reset slider drag percentage to 50/50
        if (beforeContainer && handle) {
            beforeContainer.style.width = '50%';
            handle.style.left = '50%';
        }
        
        // Execute pixel width sync
        syncBeforeImageWidth();
        
        // 2. Render Right Testimonials Stack Grid
        if (testimonialsGrid) {
            testimonialsGrid.innerHTML = '';
            
            rightStackIds.forEach((id, index) => {
                const client = clientsData[id];
                
                const card = document.createElement('div');
                card.className = 'premium-card testimonial-card clickable-success';
                card.style.cursor = 'pointer';
                card.setAttribute('data-client-id', id);
                
                card.innerHTML = `
                    <div class="client-success-header">
                        <div class="client-thumb-wrapper">
                            <img src="${client.imageThumb}" alt="${client.name} Transformation" class="client-thumb-img">
                        </div>
                        <div class="client-success-title">
                            <div class="test-header no-border no-padding">
                                <span class="test-name">${client.name}</span>
                                <span class="test-stat text-success">${client.badgeGoal}</span>
                            </div>
                            <span class="test-tag">${client.timeframe}</span>
                        </div>
                    </div>
                    <div class="testimonial-card-footer">
                        ${client.instagram ? `<a href="${client.instagramLink}" target="_blank" rel="noopener noreferrer" class="instagram-handle-link" onclick="event.stopPropagation();">${client.instagram}</a>` : '<span></span>'}
                        <span class="swap-action-label">Feature Client ↑</span>
                    </div>
                `;
                
                // Swap logic triggers on card click
                card.addEventListener('click', () => {
                    const temp = featuredClientId;
                    featuredClientId = id;
                    rightStackIds[index] = temp;
                    
                    // Simple exit scale animation
                    card.style.opacity = '0.3';
                    card.style.transform = 'scale(0.95)';
                    
                    setTimeout(() => {
                        renderTransformations();
                        
                        // Scroll main feature into view on mobile screens
                        if (window.innerWidth <= 900) {
                            const resultsSection = document.getElementById('results');
                            if (resultsSection) {
                                resultsSection.scrollIntoView({ behavior: 'smooth' });
                            }
                        }
                    }, 200);
                });
                
                testimonialsGrid.appendChild(card);
            });
        }
    };

    // Initialize transformations display
    renderTransformations();

    // Sync image sizes on resize
    window.addEventListener('resize', syncBeforeImageWidth);

    /* ==========================================================================
       BEFORE/AFTER IMAGE SLIDER EVENT LISTENERS
       ========================================================================== */
    if (slider && handle && beforeContainer) {
        let isDragging = false;

        const updateSlider = (clientX) => {
            const rect = slider.getBoundingClientRect();
            // Calculate absolute horizontal distance inside slider
            const x = clientX - rect.left;
            // Convert to percentage
            let percentage = (x / rect.width) * 100;
            
            // Boundary constraints
            if (percentage < 0) percentage = 0;
            if (percentage > 100) percentage = 100;

            // Apply style values
            handle.style.left = `${percentage}%`;
            beforeContainer.style.width = `${percentage}%`;
            
            // Ensure width is synced during dragging
            syncBeforeImageWidth();
        };

        // Desktop mouse actions
        handle.addEventListener('mousedown', (e) => {
            isDragging = true;
            e.preventDefault();
        });

        window.addEventListener('mouseup', () => {
            isDragging = false;
        });

        window.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            updateSlider(e.clientX);
        });

        // Mobile touch actions
        handle.addEventListener('touchstart', (e) => {
            isDragging = true;
        });

        window.addEventListener('touchend', () => {
            isDragging = false;
        });

        window.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            if (e.touches.length > 0) {
                updateSlider(e.touches[0].clientX);
            }
        });

        // Also allow clicking anywhere on slider to jump position
        slider.addEventListener('click', (e) => {
            if (e.target.closest('.handle-button')) return;
            updateSlider(e.clientX);
        });
    }



    /* ==========================================================================
       ONBOARDING QUIZ ("FIND YOUR PROTOCOL")
       ========================================================================== */
    const quizCard = document.getElementById('quiz-card');
    const quizSteps = document.querySelectorAll('.quiz-step');
    const progressFill = document.getElementById('quiz-progress');
    const optionBtns = document.querySelectorAll('.option-btn');
    const backBtns = document.querySelectorAll('.btn-back');
    const btnRestartQuiz = document.getElementById('btn-restart-quiz');
    const btnApplyQuizResult = document.getElementById('btn-apply-quiz-result');

    let quizData = {
        goal: '',
        exp: '',
        days: ''
    };

    let currentStep = 1;
    const totalSteps = 4;

    const updateQuizUI = () => {
        quizSteps.forEach(step => {
            step.classList.remove('active');
        });

        const activeStep = document.querySelector(`.quiz-step[data-step="${currentStep}"]`);
        if (activeStep) {
            activeStep.classList.add('active');
        }

        const progressPercentage = ((currentStep - 1) / (totalSteps - 1)) * 100;
        if (progressFill) {
            progressFill.style.width = `${Math.max(5, progressPercentage)}%`;
        }

        if (currentStep === 4) {
            calculateQuizResults();
        }
    };

    optionBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const name = btn.getAttribute('data-name');
            const value = btn.getAttribute('data-value');

            quizData[name] = value;

            const parentStep = btn.closest('.quiz-step');
            const stepOptions = parentStep.querySelectorAll('.option-btn');
            stepOptions.forEach(opt => opt.classList.remove('selected'));
            btn.classList.add('selected');

            setTimeout(() => {
                currentStep++;
                if (currentStep > totalSteps) currentStep = totalSteps;
                updateQuizUI();
            }, 250);
        });
    });

    backBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            currentStep--;
            if (currentStep < 1) currentStep = 1;
            updateQuizUI();
        });
    });

    if (btnRestartQuiz) {
        btnRestartQuiz.addEventListener('click', () => {
            quizData = { goal: '', exp: '', days: '' };
            currentStep = 1;
            optionBtns.forEach(btn => btn.classList.remove('selected'));
            updateQuizUI();
        });
    }

    const calculateQuizResults = () => {
        const programNameEl = document.getElementById('recommended-program-name');
        const programDescEl = document.getElementById('recommended-program-desc');
        const sumGoal = document.getElementById('summary-goal');
        const sumExp = document.getElementById('summary-exp');
        const sumDays = document.getElementById('summary-days');

        const goalsMap = { 'fatloss': 'Fat Loss', 'muscle': 'Build Muscle', 'recomp': 'Recomposition' };
        const expMap = { 'beginner': 'Beginner', 'intermediate': 'Intermediate', 'advanced': 'Advanced' };
        const freqMap = { '2-3': '2-3 Days/wk', '4': '4 Days/wk', '5+': '5+ Days/wk' };

        sumGoal.textContent = goalsMap[quizData.goal] || '--';
        sumExp.textContent = expMap[quizData.exp] || '--';
        sumDays.textContent = freqMap[quizData.days] || '--';

        let recommendedTitle = '';
        let recommendedDesc = '';

        if (quizData.goal === 'fatloss' && quizData.days === '2-3') {
            recommendedTitle = '12-Week Body & Mind Reset';
            recommendedDesc = 'Our structured 12-week framework is engineered specifically for fast, efficient fat loss and habit formation to reclaim your physical baseline.';
        } else if (quizData.goal === 'recomp' && quizData.exp === 'beginner') {
            recommendedTitle = 'Training & Nutrition Blueprint';
            recommendedDesc = 'The ultimate customized starter roadmap. Provides exact lifting guides and metabolic targets for self-motivated recompositions.';
        } else {
            recommendedTitle = 'Elite 1-on-1 Online Coaching';
            recommendedDesc = 'Our premium, fully customized, high-touch coaching service featuring daily Whatsapp access, video form checks, and weekly adjustments to force progress.';
        }

        if (programNameEl && programDescEl) {
            programNameEl.textContent = recommendedTitle;
            programDescEl.textContent = recommendedDesc;
            btnApplyQuizResult.setAttribute('data-target-program', recommendedTitle);
        }
    };

    if (btnApplyQuizResult) {
        btnApplyQuizResult.addEventListener('click', () => {
            const recommendedProgram = btnApplyQuizResult.getAttribute('data-target-program');
            
            const programDropdown = document.getElementById('user-program');
            const goalField = document.getElementById('user-goal');
            const contactSection = document.getElementById('contact');

            if (programDropdown) {
                programDropdown.value = recommendedProgram;
            }

            if (goalField && quizData.goal) {
                const goalsTextMap = {
                    'fatloss': 'Lose body fat, lean down',
                    'muscle': 'Build athletic muscle & strength',
                    'recomp': 'Burn fat and build muscle simultaneously (recomp)'
                };
                goalField.value = goalsTextMap[quizData.goal] || '';
            }

            if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
                
                const formCard = document.querySelector('.form-card');
                if (formCard) {
                    formCard.style.borderColor = 'var(--primary)';
                    formCard.style.boxShadow = 'var(--glow-shadow-strong)';
                    setTimeout(() => {
                        formCard.style.borderColor = 'var(--border-color)';
                        formCard.style.boxShadow = 'var(--card-shadow)';
                    }, 1500);
                }
            }
        });
    }

    const serviceBtns = document.querySelectorAll('.service-btn');
    serviceBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const program = btn.getAttribute('data-program');
            const programDropdown = document.getElementById('user-program');
            if (programDropdown && program) {
                programDropdown.value = program;
            }
        });
    });


    /* ==========================================================================
       CALORIE & MACRO CALCULATOR
       ========================================================================== */
    const btnCalcMacros = document.getElementById('btn-calculate-macros');
    const resultsBoard = document.getElementById('calc-results-board');

    if (btnCalcMacros && resultsBoard) {
        btnCalcMacros.addEventListener('click', () => {
            const gender = document.getElementById('calc-gender').value;
            const age = parseInt(document.getElementById('calc-age').value);
            const weight = parseFloat(document.getElementById('calc-weight').value);
            const height = parseFloat(document.getElementById('calc-height').value);
            const activity = parseFloat(document.getElementById('calc-activity').value);
            const goal = document.getElementById('calc-goal').value;

            if (isNaN(age) || age < 15 || age > 90 ||
                isNaN(weight) || weight < 30 || weight > 250 ||
                isNaN(height) || height < 100 || height > 250) {
                alert('Please check your inputs. Ensure age, weight, and height are valid numbers.');
                return;
            }

            let bmr = 0;
            if (gender === 'male') {
                bmr = (10 * weight) + (6.25 * height) - (5 * age) + 5;
            } else {
                bmr = (10 * weight) + (6.25 * height) - (5 * age) - 161;
            }

            const tdee = Math.round(bmr * activity);

            let targetCalories = tdee;
            if (goal === 'lose') {
                targetCalories = tdee - 500;
            } else if (goal === 'recomp') {
                targetCalories = tdee - 200;
            } else if (goal === 'gain') {
                targetCalories = tdee + 300;
            }

            const safetyFloor = gender === 'female' ? 1200 : 1500;
            if (targetCalories < safetyFloor) {
                targetCalories = safetyFloor;
            }

            let proteinGrams = Math.round(weight * 2.2);
            let proteinKcal = proteinGrams * 4;

            if (proteinKcal > (targetCalories * 0.45)) {
                proteinGrams = Math.round((targetCalories * 0.40) / 4);
                proteinKcal = proteinGrams * 4;
            }

            const fatsKcal = Math.round(targetCalories * 0.25);
            const fatsGrams = Math.round(fatsKcal / 9);

            const carbsKcal = targetCalories - proteinKcal - fatsKcal;
            const carbsGrams = Math.max(20, Math.round(carbsKcal / 4));

            const finalCalorieTotal = (proteinGrams * 4) + (carbsGrams * 4) + (fatsGrams * 9);

            document.getElementById('results-tdee').textContent = `${tdee} kcal`;
            document.getElementById('results-target-calories').textContent = `${finalCalorieTotal} kcal`;
            
            document.getElementById('results-protein').textContent = `${proteinGrams}g`;
            document.getElementById('results-protein-cal').textContent = `${proteinGrams * 4} kcal`;
            
            document.getElementById('results-carbs').textContent = `${carbsGrams}g`;
            document.getElementById('results-carbs-cal').textContent = `${carbsGrams * 4} kcal`;
            
            document.getElementById('results-fats').textContent = `${fatsGrams}g`;
            document.getElementById('results-fats-cal').textContent = `${fatsGrams * 9} kcal`;

            resultsBoard.classList.remove('hidden');

            setTimeout(() => {
                resultsBoard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }, 100);
        });
    }

    /* ==========================================================================
       FORM SUBMISSION LOGIC
       ========================================================================== */
    const applicationForm = document.getElementById('coaching-application-form');
    const formSuccessAlert = document.getElementById('form-success-alert');
    const btnSubmit = document.getElementById('btn-submit-application');

    if (applicationForm && formSuccessAlert && btnSubmit) {
        applicationForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('user-name').value.trim();
            const email = document.getElementById('user-email').value.trim();
            const insta = document.getElementById('user-insta').value.trim();

            if (!name || !email || !insta) {
                alert('Please fill in your name, email, and Instagram handle to apply.');
                return;
            }

            btnSubmit.disabled = true;
            btnSubmit.textContent = 'Processing Application...';

            setTimeout(() => {
                applicationForm.classList.add('hidden');
                formSuccessAlert.classList.remove('hidden');

                const formCard = document.querySelector('.form-card');
                if (formCard) {
                    formCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }, 1500);
        });
    }
});
