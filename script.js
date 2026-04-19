/* ═══════════════════════════════════════
   GALLERIA PAINTS — script.js
═══════════════════════════════════════ */

/* ── NAVBAR SCROLL ── */
window.addEventListener('scroll', function () {
    document.getElementById('navbar').classList.toggle('nav-scrolled', window.scrollY > 60);
}, { passive: true });

/* ── ACTIVE NAV LINK ── */
document.addEventListener('DOMContentLoaded', function () {
    var sections = document.querySelectorAll('section[id], div[id]');
    var navLinks = document.querySelectorAll('.nav-link');
    var sObs = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
            if (e.isIntersecting) {
                navLinks.forEach(function (l) {
                    var h = l.getAttribute('href') || '';
                    if (h.includes('#' + e.target.id)) {
                        navLinks.forEach(function (x) { x.classList.remove('nav-active'); });
                        l.classList.add('nav-active');
                    }
                });
            }
        });
    }, { threshold: 0.35 });
    sections.forEach(function (s) { sObs.observe(s); });
});

/* ── SCROLL REVEAL ── */
document.addEventListener('DOMContentLoaded', function () {
    var revObs = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
            if (e.isIntersecting) {
                e.target.classList.add('in-view');
                // also trigger children
                e.target.querySelectorAll('.reveal-child').forEach(function (c) {
                    c.classList.add('in-view');
                });
                revObs.unobserve(e.target);
            }
        });
    }, { threshold: 0.08 });
    document.querySelectorAll('.reveal').forEach(function (el) { revObs.observe(el); });

    // standalone children
    var cObs = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
            if (e.isIntersecting) { e.target.classList.add('in-view'); cObs.unobserve(e.target); }
        });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal-child').forEach(function (el) { cObs.observe(el); });
});

/* ── AUTH FORM ── */
function openSignup() {
    var s = document.getElementById('registerSection');
    s.style.display = 'flex';
    setTimeout(function () { s.style.opacity = '1'; }, 10);
}
function closeSignup() {
    var s = document.getElementById('registerSection');
    s.style.opacity = '0';
    setTimeout(function () { s.style.display = 'none'; s.style.opacity = ''; }, 300);
}

// close on backdrop click
document.addEventListener('DOMContentLoaded', function () {
    var rs = document.getElementById('registerSection');
    if (rs) {
        rs.addEventListener('click', function (e) {
            if (e.target === rs) closeSignup();
        });
    }
});

$(document).ready(function () {
    $('.btn-signup, #open-signup-btn').click(function (e) {
        e.preventDefault();
        openSignup();
        $('#sign-up').show(); $('#sign-in').addClass('d-none');
    });

    $('.auth-close-btn').click(function () { closeSignup(); });

    $('#open-sign-in').click(function (e) {
        e.preventDefault();
        $('#sign-up').fadeOut(250, function () {
            $('#sign-in').removeClass('d-none').fadeIn(250);
        });
    });

    $('#open-sign-up').click(function (e) {
        e.preventDefault();
        $('#sign-in').fadeOut(250, function () {
            $('#sign-up').removeClass('d-none').fadeIn(250);
        });
    });

    $('#register-btn').click(function () {
        var name  = $('#signup-name').val().trim();
        var email = $('#signup-email').val().trim();
        var pass  = $('#signup-pass').val();
        var cpass = $('#signup-cpass').val();
        if (!name || !email || !pass || !cpass) { showToast('All fields are required!', 'error'); return; }
        if (pass !== cpass) { showToast('Passwords do not match!', 'error'); return; }
        showToast('Registration Successful! Welcome to Galleria.', 'success');
        $('#signup-name, #signup-email, #signup-pass, #signup-cpass').val('');
        setTimeout(function () { closeSignup(); }, 1200);
    });

    $('.register-sign-in-btn').click(function () {
        var email = $('#signin-email').val().trim();
        var pass  = $('#signin-pass').val();
        if (!email || !pass) { showToast('Please fill all fields!', 'error'); return; }
        showToast('Signed in successfully! Welcome back.', 'success');
        setTimeout(function () { closeSignup(); }, 1200);
    });
});

/* ── TOAST NOTIFICATION ── */
function showToast(msg, type) {
    var t = document.createElement('div');
    t.style.cssText = [
        'position:fixed', 'bottom:28px', 'right:28px',
        'background:' + (type === 'error' ? '#e8603c' : '#0f1e2e'),
        'color:#fff', 'padding:14px 22px', 'border-radius:10px',
        'font-family:DM Sans,sans-serif', 'font-size:.88rem',
        'z-index:999999', 'box-shadow:0 8px 28px rgba(0,0,0,.22)',
        'display:flex', 'align-items:center', 'gap:10px',
        'border-left:3px solid ' + (type === 'error' ? '#fff' : '#e8603c'),
        'animation:toastIn .4s ease', 'max-width:320px'
    ].join(';');
    var icon = type === 'error' ? 'fa-exclamation-circle' : 'fa-check-circle';
    t.innerHTML = '<i class="fas ' + icon + '" style="font-size:1rem;color:' + (type === 'error' ? '#fff' : '#e8603c') + '"></i>' + msg;
    document.body.appendChild(t);
    // inject animation
    if (!document.getElementById('toastStyle')) {
        var s = document.createElement('style');
        s.id = 'toastStyle';
        s.textContent = '@keyframes toastIn{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}';
        document.head.appendChild(s);
    }
    setTimeout(function () {
        t.style.transition = 'opacity .4s'; t.style.opacity = '0';
        setTimeout(function () { t.remove(); }, 400);
    }, 2800);
}

/* ── PRODUCT DATA ── */
var products = {
    f1: { name:"Cielia Paints", para:"Ceilia is a smooth, high-quality interior paint that blends perfectly on walls. Provides a long-lasting matte finish and is fade-resistant.", featured:["Anti-dust technology","Smooth matte finish","Low VOC formula","Quick touch-up friendly"], price:"Rs 1,500", img:"images/Cielia.png" },
    f2: { name:"Ferra Coat", para:"Ferra Coat offers premium protection with advanced microfiber reinforcement for exceptional durability and elegance.", featured:["Microfiber reinforcement","Scratch-resistant surface","Anti-bacterial coating","Easy color retention"], price:"Rs 800", img:"images/Ferra Coat.png" },
    f3: { name:"Primary Volx", para:"Primary Volx comes in bright, bold colors that make interiors lively and modern. Smooth even coverage and odor-free formula.", featured:["High pigment density","Seamless wall coverage","Fast leveling","Odor-neutral formula"], price:"Rs 2,000", img:"images/Primary Volx.png" },
    f4: { name:"Sky Vera Coat", para:"Sky Vera Coat is versatile for both interiors and exteriors with a sleek washable finish keeping colors vibrant.", featured:["Thermal insulation layer","Soft-touch feel","Eco-friendly ingredients","Long-lasting shine"], price:"Rs 3,500", img:"images/Sky vera coat.png" },
    1:  { name:"Anti Corrosion", para:"Anti Corrosion provides advanced protection against internal wall damage. Shields surfaces from moisture and chemical impact.", featured:["Long-lasting protection","Smooth interior finish","Moisture resistance","Easy maintenance"], price:"Rs 20,000", img:"images/Anti Corrosion.png" },
    2:  { name:"Hydro Shield Range", para:"Hydro Shield Range delivers superior resistance against damp and water penetration. Strengthens walls by preventing cracks.", featured:["Water repellent","Damp wall protection","Crack resistance","Durable coating"], price:"Rs 22,000", img:"images/Hydro Shield.webp" },
    3:  { name:"Aqua Primary", para:"Aqua Primary creates a strong reliable foundation for interior coatings ensuring uniform surface preparation.", featured:["Strong base adhesion","Uniform surface prep","Low odor formula","Quick drying"], price:"Rs 25,000", img:"images/Aqua Primary.png" },
    4:  { name:"Base Prime System", para:"Base Prime System enhances surface bonding for extended paint life. Improves topcoat smoothness.", featured:["Deep surface bonding","Improves paint life","Smooth topcoat support","High coverage"], price:"Rs 18,000", img:"images/Base Prime System.png" },
    11: { name:"Silk Smooth Coating", para:"Silk Smooth Coating delivers a refined elegant exterior appearance with advanced weather and fade resistance.", featured:["Weather resistant","Silky smooth texture","Fade resistance","Long durability"], price:"Rs 19,000", img:"images/Silk Smooth Coating.png" },
    12: { name:"Pearl Sheen", para:"Pearl Sheen offers a premium glossy finish with superior surface protection. Resists UV rays and stains.", featured:["Premium glossy look","UV protection","Easy washability","Stain resistance"], price:"Rs 18,000", img:"images/Pearl Sheen.png" },
    13: { name:"Sunproof Coating", para:"Advanced sunproof exterior coating with exceptional heat resistance keeping color stable in harsh conditions.", featured:["Heat resistance","Sunlight protection","Color stability","Exterior durability"], price:"Rs 20,000", img:"images/Metal Shield Pro.png" },
    14: { name:"Matte Sealer", para:"Matte Sealer delivers a modern non-reflective exterior finish. Effectively seals cracks and strengthens wall surfaces.", featured:["Non-reflective finish","Crack control","Strong sealing","Long protection"], price:"Rs 15,000", img:"images/Matte Sealer.png" },
    21: { name:"Iron Max Finishes", para:"Iron Max Finishes combine heavy-duty strength with luxury metal look. Protect from rust corrosion and mechanical stress.", featured:["Heavy duty strength","Luxury metal finish","Rust protection","High durability"], price:"Rs 18,000", img:"images/Iron Max Finishes.png" },
    22: { name:"Premium Satin", para:"Premium Satin offers a soft sophisticated satin sheen. Smooth texture enhances interior elegance.", featured:["Soft satin shine","Premium smooth touch","Easy cleaning","Elegant finish"], price:"Rs 13,000", img:"images/Premium Satin.png" },
    23: { name:"Primer Coat Essential", para:"Primer Coat Essential ensures superior bonding and surface stability. Levels imperfections for flawless topcoat.", featured:["Superior bonding","Surface leveling","Enhanced durability","Professional base"], price:"Rs 14,000", img:"images/Primer Coat Essential.png" },
    24: { name:"Rust Free Primer", para:"Rust Free Primer delivers powerful anti-rust protection for metal surfaces. Forms a strong grip preventing corrosion.", featured:["Anti-rust formula","Metal surface safety","Long-term protection","Strong grip"], price:"Rs 14,500", img:"images/Rust Free Primer.png" },
    31: { name:"Sky Coat", para:"Sky Coat provides dependable protection for metal structures. Resists weather impact with smooth application.", featured:["Metal surface protection","Weather resistance","Smooth application","Long life finish"], price:"Rs 49,000", img:"images/Sky Coat.webp" },
    32: { name:"Foundation Premier", para:"Foundation Premier strengthens metal adhesion and corrosion resistance. Industrial-grade reliability.", featured:["Strong metal adhesion","Corrosion resistance","Uniform coverage","Durable base"], price:"Rs 21,000", img:"images/Foundation Premier.webp" },
    33: { name:"Ultra Durable Emulsion", para:"Ultra Durable Emulsion offers exceptional strength for heavy-duty applications. Resists scratches and surface damage.", featured:["High strength coating","Industrial grade","Scratch resistance","Long lasting"], price:"Rs 14,000", img:"images/Ultra Durable Emulsion.png" },
    34: { name:"Sun Proof Coating", para:"Sun Proof Coating shields metal surfaces from heat and UV exposure. Ideal for outdoor metal protection.", featured:["Heat protection","UV resistance","Fade control","Outdoor safety"], price:"Rs 22,000", img:"images/Sun Proof Coating.png" },
    41: { name:"Steel Guard Coating", para:"Steel Guard Coating protects steel surfaces against corrosion. Strong adhesion for extended service life.", featured:["Steel protection","Anti-corrosion","Long durability","Strong adhesion"], price:"Rs 21,000", img:"images/Steel Guard Coating.png" },
    42: { name:"Velvet Touch", para:"Velvet Touch creates an ultra-smooth base layer enhancing surface softness for premium topcoat application.", featured:["Smooth base finish","Soft texture","Easy application","Premium prep"], price:"Rs 15,000", img:"images/Velvet Touch.png" },
    43: { name:"Weather Shield", para:"Weather Shield offers advanced resistance against climate damage. Blocks moisture while preventing cracking.", featured:["Climate protection","Moisture resistance","Anti-crack formula","Strong sealing"], price:"Rs 18,000", img:"images/Weather Shield.png" },
    44: { name:"Roof Seal", para:"Roof Seal provides effective leak and crack sealing. Creates a waterproof barrier for roof surfaces.", featured:["Crack prevention","Waterproof barrier","Crack filling","Long life seal"], price:"Rs 15,000", img:"images/Roof Seal.webp" },
    51: { name:"Aqua Block", para:"Aqua Block delivers complete waterproofing performance. Prevents leaks and structural water damage.", featured:["Complete waterproofing","Leak prevention","High flexibility","Long durability"], price:"Rs 17,000", img:"images/Aqua Block.webp" },
    52: { name:"Matt Finish", para:"Matt Finish reduces surface heat while offering a clean roof look with weather durability.", featured:["Non-slip surface","Heat reduction","Clean look","Weather resistance"], price:"Rs 16,500", img:"images/Matt Finish.png" },
    53: { name:"Hydro Shield Range", para:"Hydro Shield Range protects roofs from moisture penetration. Resists cracking and surface degradation.", featured:["Moisture blocking","Roof protection","Crack resistance","Strong coating"], price:"Rs 18,000", img:"images/Cool Onix.png" },
    54: { name:"Under Seal Pro", para:"Under Seal Pro penetrates deeply to seal surfaces. Enhances bonding and water resistance for extended roof protection.", featured:["Deep sealing","Surface bonding","Long protection","Water resistance"], price:"Rs 12,000", img:"images/Top Crest.png" },
    61: { name:"Sky Coat Finishes", para:"Sky Coat Finishes deliver a smooth and bright ceiling appearance with long-lasting durability.", featured:["Smooth ceiling finish","Bright look","Easy maintenance","Long durability"], price:"Rs 8,000", img:"images/Ciel Aura.png" },
    62: { name:"Cool Roof Coatings", para:"Cool Roof Coatings reflect heat to reduce roof temperature. Improves energy efficiency and UV protection.", featured:["Heat reflection","Energy saving","UV resistance","Roof safety"], price:"Rs 10,000", img:"images/Hydro Flex.png" },
    63: { name:"Ultra Ceil Systems", para:"Ultra Ceil Systems provide premium ceiling coverage with uniform texture and crack resistance.", featured:["Premium ceiling cover","Uniform texture","Crack resistance","Long lasting"], price:"Rs 11,500", img:"images/Storm Guard.png" },
    64: { name:"Top Shield Ceiling", para:"Top Shield Ceiling protects against moisture and stains. Ensures a clean and refined ceiling finish.", featured:["Protective coating","Moisture resistance","Clean finish","Durable surface"], price:"Rs 14,000", img:"images/Aqua Tite.png" },
};

/* ── OPEN DETAIL PAGE ── */
function openDetailPage(p) {
    if (!p) return;
    document.getElementById('detailName').innerText  = p.name;
    document.getElementById('detail-para').innerText = p.para;
    document.getElementById('detailPrice').innerText  = p.price;
    document.getElementById('detailImg').src          = p.img;
    var fl = document.querySelector('.detail-features-list');
    fl.innerHTML = '';
    (p.featured || []).forEach(function (item) {
        var li = document.createElement('li');
        li.innerText = item;
        fl.appendChild(li);
    });
    document.querySelector('.detail-section').style.display = 'block';
    document.getElementById('detailPage').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

document.querySelectorAll('.card.product-card, .featured-product-card.card').forEach(function (card) {
    card.style.cursor = 'pointer';
    card.addEventListener('click', function () {
        var id = card.id;
        if (products[id]) openDetailPage(products[id]);
    });
});

document.getElementById('closeDetail').addEventListener('click', function () {
    document.getElementById('detailPage').style.display = 'none';
    document.querySelector('.detail-section').style.display = 'none';
    document.body.style.overflow = '';
});

/* ── BUY NOW MODAL ── */
document.getElementById('buyNowForm').addEventListener('submit', function (e) {
    e.preventDefault();
    var name     = document.getElementById('name').value.trim();
    var email    = document.getElementById('email').value.trim();
    var phone    = document.getElementById('phone').value.trim();
    var address  = document.getElementById('address').value.trim();
    var notes    = document.getElementById('ordernotes').value.trim();
    var city     = document.getElementById('city').value.trim();
    if (!name || !email || !phone || !address || !notes || !city) {
        showToast('Please fill all required fields.', 'error'); return;
    }
    showToast('Order placed successfully! We will contact you shortly.', 'success');
    var modal = bootstrap.Modal.getInstance(document.getElementById('buyNowModal'));
    if (modal) modal.hide();
    this.reset();
});

/* ── TESTIMONIALS ── */
var currentIndex = 0;
var totalReviews = document.querySelectorAll('.testimonials-review-item').length;

function goToReview(n) {
    document.querySelectorAll('.testimonials-review-item')[currentIndex].classList.remove('active');
    document.querySelectorAll('.testimoials-image-box img')[currentIndex].classList.remove('active');
    document.querySelectorAll('.t-dot')[currentIndex].classList.remove('active');
    currentIndex = (n + totalReviews) % totalReviews;
    document.querySelectorAll('.testimonials-review-item')[currentIndex].classList.add('active');
    document.querySelectorAll('.testimoials-image-box img')[currentIndex].classList.add('active');
    document.querySelectorAll('.t-dot')[currentIndex].classList.add('active');
}

document.getElementById('testimonials-nextBtn').addEventListener('click', function () { goToReview(currentIndex + 1); });
document.getElementById('testimonials-prevBtn').addEventListener('click', function () { goToReview(currentIndex - 1); });
document.querySelectorAll('.t-dot').forEach(function (dot, i) {
    dot.addEventListener('click', function () { goToReview(i); });
});

// Auto-rotate testimonials every 5s
setInterval(function () { goToReview(currentIndex + 1); }, 5000);

/* ── HISTORY READ MORE ── */
$(document).ready(function () {
    $('.galleria-history-read-more-btn').click(function () {
        var btn = $(this);
        var full = $('.galleria-history-full-text');
        if (btn.hasClass('open')) {
            full.slideUp(400);
            btn.removeClass('open');
            btn.find('span').text('Read More');
        } else {
            full.slideDown(400);
            btn.addClass('open');
            btn.find('span').text('Read Less');
        }
    });

    /* ── FOOTER SUBSCRIBE ── */
    $('#footersubscribeBtn').click(function () {
        var val = $('#subscribeInput').val().trim();
        if (!val) { showToast('Please enter your email!', 'error'); return; }
        showToast('Thanks for subscribing to Galleria!', 'success');
        $('#subscribeInput').val('');
    });
});

/* ── CAROUSEL CAPTION RESET ON SLIDE ── */
document.getElementById('carouselExampleCaptions').addEventListener('slide.bs.carousel', function () {
    document.querySelectorAll('.caption-badge, .caption-h2, .caption-p, .caption-btn').forEach(function (el) {
        el.style.animation = 'none';
        el.style.opacity = '0';
    });
});
document.getElementById('carouselExampleCaptions').addEventListener('slid.bs.carousel', function () {
    var delays = { '.caption-badge': '.3s', '.caption-h2': '.5s', '.caption-p': '.75s', '.caption-btn': '1s' };
    Object.keys(delays).forEach(function (sel) {
        var el = document.querySelector('.carousel-item.active ' + sel);
        if (el) {
            el.style.animation = '';
            el.style.opacity = '';
            el.style.animationDelay = delays[sel];
        }
    });
});