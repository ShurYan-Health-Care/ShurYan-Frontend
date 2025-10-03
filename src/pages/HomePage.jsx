import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';

// استيراد الصور
import DrYoussef from './images/Dr-Youssef-Hamdi.jpg';
import DrAlia from './images/Dr-Alia Al-Masry.jpg';
import DrAhmed from './images/Dr-Ahmed Al-Sharif.jpg';
import DrNourhan from './images/Dr-Nourhan El-Sayed.jpg';
import DrSarah from './images/Dr-Sarah-Ibrahim.jpg';
import DrKarim from './images/Dr. Karim-Abdel-Aziz.jpg';
import HeroImage from './images/main.png';
import DoctorJoinCard from '../components/DoctorJoinCard';


const HomePage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [doctorImages, setDoctorImages] = useState(Array(6).fill(null));
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const canvasRef = useRef(null);

  const doctorsData = [
    { name: 'د. يوسف حمدي', specialty: 'طبيب عام', rating: 4.9, reviews: 120, bio: "طبيب عام بخبرة واسعة في تشخيص وعلاج الحالات الطارئة والمزمنة، يهتم بتقديم رعاية صحية متكاملة.", experience: '12+ سنة خبرة', location: 'الجيزة - المهندسين', imageSrc: DrYoussef },
    { name: 'د. علياء المصري', specialty: 'طبيبة أطفال', rating: 4.8, reviews: 95, bio: 'متخصصة في طب الأطفال وحديثي الولادة، تقدم متابعة شاملة لنمو الطفل وصحته.', experience: '10+ سنوات خبرة', location: 'القاهرة - مدينة نصر', imageSrc: DrAlia },
    { name: 'د. أحمد الشريف', specialty: 'جراح عظام', rating: 4.9, reviews: 210, bio: 'استشاري جراحة العظام متخصص في الإصابات الرياضية وتغيير المفاصل.', experience: '18+ سنة خبرة', location: 'الإسكندرية - سموحة', imageSrc: DrAhmed },
    { name: 'د. نورهان السيد', specialty: 'طبيبة نساء وتوليد', rating: 4.7, reviews: 88, bio: 'تقدم رعاية متكاملة لصحة المرأة، ومتابعة الحمل والولادة بأحدث التقنيات.', experience: '9+ سنوات خبرة', location: 'القاهرة - التجمع الخامس', imageSrc: DrNourhan },
    { name: 'د. سارة إبراهيم', specialty: 'طبيبة جلدية', rating: 4.8, reviews: 150, bio: 'متخصصة في علاج الأمراض الجلدية والتجميل والليزر، عضو الجمعية المصرية للأمراض الجلدية.', experience: '11+ سنة خبرة', location: 'الجيزة - الشيخ زايد', imageSrc: DrSarah },
    { name: 'د. كريم عبد العزيز', specialty: 'طبيب قلب وأوعية دموية', rating: 5.0, reviews: 300, bio: 'استشاري أمراض القلب والقسطرة العلاجية، حاصل على الزمالة البريطانية لأمراض القلب.', experience: '20+ سنة خبرة', location: 'القاهرة - المعادي', imageSrc: DrKarim }
  ];

  const config = {
    colors: { 
      primary: '#4FD1C5', 
      white: '#FFFFFF', 
      darkText: '#2D3748', 
      lightText: '#718096', 
      star: '#FBBF24', 
      shadow: 'rgba(0, 0, 0, 0.08)', 
      icon: '#A0AEC0', 
      separator: '#E2E8F0' 
    },
    padding: 35,
    borderRadius: 20
  };

  const icons = {
    briefcase: 'M7.5 7.5C7.5 5.843 8.843 4.5 10.5 4.5h3C15.157 4.5 16.5 5.843 16.5 7.5v.75H18.75c1.243 0 2.25 1.007 2.25 2.25v6c0 1.243-1.007 2.25-2.25 2.25H5.25c-1.243 0-2.25-1.007-2.25-2.25v-6c0-1.243 1.007 2.25 2.25-2.25H7.5V7.5zM9 8.25V7.5c0-.828.672-1.5 1.5-1.5h3c.828 0 1.5.672 1.5 1.5v.75H9z',
    location: 'M12 2C8.134 2 5 5.134 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.866-3.134-7-7-7zm0 9.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z'
  };

  const drawRoundedRect = useCallback((ctx, x, y, width, height, radius) => {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.arcTo(x + width, y, x + width, y + radius, radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.arcTo(x + width, y + height, x + width - radius, y + height, radius);
    ctx.lineTo(x + radius, y + height);
    ctx.arcTo(x, y + height, x, y + height - radius, radius);
    ctx.lineTo(x, y + radius);
    ctx.arcTo(x, y, x + radius, y, radius);
    ctx.closePath();
  }, []);

  const drawCardBackground = useCallback((ctx, w, h) => {
    ctx.save();
    ctx.shadowColor = config.colors.shadow;
    ctx.shadowBlur = 30;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 10;
    drawRoundedRect(ctx, 0, 0, w, h, config.borderRadius);
    ctx.fillStyle = config.colors.white;
    ctx.fill();
    ctx.restore();
  }, [config.colors.shadow, config.borderRadius, drawRoundedRect]);

  const drawGradientOverlay = useCallback((ctx, w, h) => {
    ctx.save();
    const gradient = ctx.createLinearGradient(0, 0, w, h * 0.8);
    gradient.addColorStop(0, 'rgba(79, 209, 197, 0.35)');
    gradient.addColorStop(1, 'rgba(79, 209, 197, 0.05)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, w, h);
    ctx.restore();
  }, []);

  const drawDoctorImage = useCallback((ctx, w, h, image) => {
    const imgWidth = w * 0.5;
    const imgHeight = h;
    if (!image || !image.complete || image.naturalHeight === 0) {
      ctx.save();
      ctx.fillStyle = '#F7FAFC';
      ctx.fillRect(0, 0, imgWidth, imgHeight);
      ctx.font = '16px Cairo';
      ctx.fillStyle = config.colors.lightText;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('يرجى تحميل الصور', imgWidth / 2, imgHeight / 2);
      ctx.restore();
      return;
    }
    const imageAspectRatio = image.naturalWidth / image.naturalHeight;
    const containerAspectRatio = imgWidth / imgHeight;
    let sx = 0, sy = 0, sWidth, sHeight;
    if (imageAspectRatio > containerAspectRatio) {
      sHeight = image.naturalHeight;
      sWidth = sHeight * containerAspectRatio;
      sx = (image.naturalWidth - sWidth) / 2;
      sy = 0;
    } else {
      sWidth = image.naturalWidth;
      sHeight = sWidth / containerAspectRatio;
      sy = (image.naturalHeight - sHeight) / 2;
      sx = 0;
    }
    ctx.drawImage(image, sx, sy, sWidth, sHeight, 0, 0, imgWidth, imgHeight);
  }, [config.colors.lightText]);

  const drawStar = useCallback((ctx, cx, cy, spikes = 5, outerRadius, innerRadius) => {
    let rot = Math.PI / 2 * 3;
    let x = cx;
    let y = cy;
    let step = Math.PI / spikes;
    ctx.beginPath();
    ctx.moveTo(cx, cy - outerRadius);
    for (let i = 0; i < spikes; i++) {
      x = cx + Math.cos(rot) * outerRadius;
      y = cy + Math.sin(rot) * outerRadius;
      ctx.lineTo(x, y);
      rot += step;
      x = cx + Math.cos(rot) * innerRadius;
      y = cy + Math.sin(rot) * innerRadius;
      ctx.lineTo(x, y);
      rot += step;
    }
    ctx.lineTo(cx, cy - outerRadius);
    ctx.closePath();
  }, []);

  const wrapText = useCallback((ctx, text, x, y, maxWidth, lineHeight) => {
    const words = text.split(' ');
    let line = '';
    let lineCount = 0;
    let currentY = y;
    for (let n = 0; n < words.length; n++) {
      if (lineCount >= 2) break;
      const testLine = line + words[n] + ' ';
      const metrics = ctx.measureText(testLine);
      const testWidth = metrics.width;
      if (testWidth > maxWidth && n > 0) {
        ctx.fillText(line.trim(), x, currentY);
        line = words[n] + ' ';
        currentY += lineHeight;
        lineCount++;
      } else {
        line = testLine;
      }
    }
    if (lineCount < 2) {
      ctx.fillText(line.trim(), x, currentY);
    }
  }, []);

  const drawIcon = useCallback((ctx, path, x, y, size) => {
    ctx.save();
    const p = new Path2D(path);
    const scale = size / 24;
    ctx.translate(x, y);
    ctx.scale(scale, scale);
    ctx.fillStyle = config.colors.icon;
    ctx.fill(p);
    ctx.restore();
  }, [config.colors.icon]);

  const drawRatingStars = useCallback((ctx, x, y, rating, starSize = 18, ratingText) => {
    const starSpacing = starSize * 1.2;
    ctx.font = `600 ${Math.max(14, starSize * 0.7)}px Cairo`;
    ctx.fillStyle = config.colors.lightText;
    ctx.textAlign = 'right';
    ctx.fillText(ratingText, x, y + 5);
    const textWidth = ctx.measureText(ratingText).width;
    const starBlockRightEdge = x - textWidth - 10;
    ctx.save();
    for (let i = 0; i < 5; i++) {
      const currentStarX = starBlockRightEdge - (i * starSpacing) - (starSize / 2);
      ctx.fillStyle = i < Math.floor(rating) ? config.colors.star : config.colors.separator;
      drawStar(ctx, currentStarX, y, 5, starSize / 2, starSize / 4);
      ctx.fill();
    }
    ctx.restore();
  }, [config.colors.lightText, config.colors.star, config.colors.separator, drawStar]);

  const drawActions = useCallback((ctx, w, h, x, contentAreaWidth) => {
    const actionHeight = 48;
    const buttonWidth = Math.min(140, contentAreaWidth / 2 - 10);
    const buttonGap = 15;
    const buttonFontSize = Math.max(14, w * 0.017);
    const buttonsY = h - actionHeight - config.padding;
    const rightEdge = x + contentAreaWidth;
    const bookButtonX = rightEdge - buttonWidth;
    drawRoundedRect(ctx, bookButtonX, buttonsY, buttonWidth, actionHeight, 12);
    ctx.fillStyle = config.colors.primary;
    ctx.fill();
    ctx.font = `bold ${buttonFontSize}px Cairo`;
    ctx.fillStyle = config.colors.white;
    ctx.textAlign = 'center';
    ctx.fillText('احجز الآن', bookButtonX + buttonWidth / 2, buttonsY + actionHeight / 2 + 6);
    const profileButtonX = bookButtonX - buttonGap - buttonWidth;
    ctx.fillStyle = config.colors.primary;
    ctx.textAlign = 'center';
    ctx.fillText('الملف الشخصي', profileButtonX + buttonWidth / 2, buttonsY + actionHeight / 2 + 6);
    ctx.textAlign = 'right';
  }, [config.padding, config.colors.primary, config.colors.white, drawRoundedRect]);

  const drawDoctorInfo = useCallback((ctx, w, h, doctor) => {
    ctx.save();
    ctx.direction = 'rtl';
    const imgWidth = w * 0.5;
    const contentStartX = imgWidth + config.padding;
    const contentAreaX = w - config.padding;
    const contentAreaWidth = contentAreaX - contentStartX;
    const actionHeight = 48;
    const contentTopY = config.padding;
    const contentBottomY = h - config.padding - actionHeight;
    const availableHeight = contentBottomY - contentTopY;
    let currentY = contentTopY + (availableHeight * 0.05);
    const nameFontSize = Math.max(22, w * 0.032);
    ctx.font = `bold ${nameFontSize}px Cairo`;
    ctx.fillStyle = config.colors.darkText;
    ctx.textAlign = 'right';
    ctx.fillText(doctor.name, contentAreaX, currentY);
    currentY += nameFontSize * 1.2;
    const specialtyFontSize = Math.max(16, w * 0.019);
    ctx.font = `600 ${specialtyFontSize}px Cairo`;
    ctx.fillStyle = config.colors.primary;
    ctx.fillText(doctor.specialty, contentAreaX, currentY);
    currentY = contentTopY + (availableHeight * 0.28);
    drawRatingStars(ctx, contentAreaX, currentY, doctor.rating, 18, `${doctor.rating} (${doctor.reviews} تقييم)`);
    currentY = contentTopY + (availableHeight * 0.45);
    const bioFontSize = Math.max(14, w * 0.017);
    ctx.font = `400 ${bioFontSize}px Cairo`;
    ctx.fillStyle = config.colors.lightText;
    wrapText(ctx, doctor.bio, contentAreaX, currentY, contentAreaWidth, bioFontSize * 1.6);
    currentY = contentTopY + (availableHeight * 0.85);
    const metaFontSize = Math.max(14, w * 0.017);
    ctx.font = `600 ${metaFontSize}px Cairo`;
    ctx.fillStyle = config.colors.darkText;
    ctx.fillText(doctor.experience, contentAreaX - 30, currentY + 5);
    drawIcon(ctx, icons.briefcase, contentAreaX - 5, currentY - 8, 20);
    const locationTextWidth = ctx.measureText(doctor.location).width;
    ctx.fillText(doctor.location, contentStartX + locationTextWidth + 30, currentY + 5);
    drawIcon(ctx, icons.location, contentStartX + locationTextWidth + 38, currentY - 8, 20);
    drawActions(ctx, w, h, contentStartX, contentAreaWidth);
    ctx.restore();
  }, [config.padding, config.colors.darkText, config.colors.primary, config.colors.lightText, drawRatingStars, wrapText, drawIcon, icons, drawActions]);

  const drawCard = useCallback((index) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.parentElement.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = Math.min((rect.width * 0.52) * dpr, 480 * dpr);
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${canvas.height / dpr}px`;
    ctx.scale(dpr, dpr);
    const canvasW = canvas.width / dpr;
    const canvasH = canvas.height / dpr;
    ctx.clearRect(0, 0, canvasW, canvasH);
    drawCardBackground(ctx, canvasW, canvasH);
    ctx.save();
    drawRoundedRect(ctx, 0, 0, canvasW, canvasH, config.borderRadius);
    ctx.clip();
    drawGradientOverlay(ctx, canvasW, canvasH);
    drawDoctorImage(ctx, canvasW, canvasH, doctorImages[index]);
    drawDoctorInfo(ctx, canvasW, canvasH, doctorsData[index]);
    ctx.restore();
  }, [doctorImages, config.borderRadius, drawCardBackground, drawRoundedRect, drawGradientOverlay, drawDoctorImage, drawDoctorInfo]);

  const preloadImages = useCallback(() => {
    let loadedCount = 0;
    const totalImages = doctorsData.length;
    const newImages = [...doctorImages];
    doctorsData.forEach((doctor, index) => {
      if (!doctor.imageSrc) {
        newImages[index] = null;
        loadedCount++;
        if (loadedCount === totalImages) {
          setDoctorImages(newImages);
          setImagesLoaded(true);
        }
        return;
      }
      const img = new Image();
      img.src = doctor.imageSrc;
      img.onload = () => {
        newImages[index] = img;
        loadedCount++;
        if (loadedCount === totalImages) {
          setDoctorImages(newImages);
          setImagesLoaded(true);
        }
      };
      img.onerror = () => {
        newImages[index] = null;
        console.error(`Failed to load image for ${doctor.name}`);
        loadedCount++;
        if (loadedCount === totalImages) {
          setDoctorImages(newImages);
          setImagesLoaded(true);
        }
      };
    });
  }, [doctorImages]);

  useEffect(() => {
    if (imagesLoaded || doctorImages.some(img => img !== null)) {
      drawCard(currentIndex);
    }
  }, [currentIndex, imagesLoaded, doctorImages, drawCard]);

  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current && canvasRef.current.offsetParent !== null) {
        drawCard(currentIndex);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [currentIndex, drawCard]);

  useEffect(() => {
    preloadImages();
  }, []);

  const nextDoctor = () => {
    setCurrentIndex((prev) => (prev + 1) % doctorsData.length);
  };

  const prevDoctor = () => {
    setCurrentIndex((prev) => (prev - 1 + doctorsData.length) % doctorsData.length);
  };

  const goToDoctor = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="w-full bg-gray-100 flex flex-col items-center" dir="rtl">
      <style>{`
        body {
          font-family: 'Cairo', sans-serif;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
        canvas {
          cursor: pointer;
        }
        html {
          scroll-behavior: smooth;
        }
        .teal-grid-background {
          background-color: #115e59;
          background-image:
            linear-gradient(rgba(20, 210, 197, 0.07) 1px, transparent 1px),
            linear-gradient(90deg, rgba(20, 210, 197, 0.07) 1px, transparent 1px);
          background-size: 30px 30px;
        }
        .hero-bg {
          background-color: #f8fafc;
          position: relative;
          overflow: hidden;
          min-height: 100vh; /* Ensure Hero Section fills the viewport height */
        }
        .waves {
          position: relative;
          width: 100%;
          height: 15vh;
          min-height: 100px;
          max-height: 150px;
        }
        .parallax > use {
          animation: move-forever 25s cubic-bezier(.55,.5,.45,.5) infinite;
        }
        .parallax > use:nth-child(1) {
          animation-delay: -2s;
          animation-duration: 7s;
        }
        .parallax > use:nth-child(2) {
          animation-delay: -3s;
          animation-duration: 10s;
        }
        .parallax > use:nth-child(3) {
          animation-delay: -4s;
          animation-duration: 13s;
        }
        .parallax > use:nth-child(4) {
          animation-delay: -5s;
          animation-duration: 20s;
        }
        @keyframes move-forever {
          0% {
            transform: translate3d(-90px,0,0);
          }
          100% { 
            transform: translate3d(85px,0,0);
          }
        }
      `}</style>
      <main className="w-full">
        {/* Hero Section */}
        <section id="hero" className="w-full hero-bg flex flex-col -mt-20">
          <div className="container mx-auto px-6 relative z-20 flex-grow flex flex-col">
            <div className="flex-grow grid lg:grid-cols-2 gap-6 items-center pb-4 pt-0">
              <div className="text-center lg:text-right mt-0">
                <div className="flex items-center justify-center lg:justify-start space-x-3 space-x-reverse mb-6">
                  <svg className="h-10 w-10 text-teal-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                  </svg>
                  <h1 className="text-4xl font-bold text-gray-800 tracking-wide">شُريان</h1>
                </div>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-800 leading-tight mb-6">
                  صحتك أمانة.. <br className="hidden lg:block" /> ورعايتك مهمتنا.
                </h2>
                <p className="text-lg text-gray-600 max-w-xl mx-auto lg:mx-0 mb-8">
                  في شُريان، نؤمن أن الوصول للرعاية الصحية يجب أن يكون سهلاً ومريحاً. لذلك، جمعنا لك نخبة من أفضل الأطباء، لنكون شريكك الدائم في رحلتك نحو صحة أفضل.
                </p>
                <div className="flex items-center justify-center lg:justify-start space-x-4 space-x-reverse">
                  <Link to="/register" className="bg-teal-400 text-white font-bold px-8 py-3 rounded-lg hover:bg-teal-500 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-lg">
                    إنشاء حساب
                  </Link>
                  <Link to="/login" className="font-semibold text-gray-700 px-8 py-3 transition-colors duration-300 hover:text-teal-500 text-lg">
                    تسجيل الدخول
                  </Link>
                </div>
              </div>
              <div className="hidden lg:flex justify-center items-center">
                <img src={HeroImage} alt="رسم توضيحي لطبيبة و مريض" className="max-w-md lg:max-w-2xl relative z-20" />
              </div>
            </div>
          </div>
          <div className="relative w-full h-auto">
            <svg className="waves" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 24 150 28" preserveAspectRatio="none" shapeRendering="auto">
              <defs>
                <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
              </defs>
              <g className="parallax">
                <use xlinkHref="#gentle-wave" x="48" y="0" fill="rgba(79,209,197,0.7)" />
                <use xlinkHref="#gentle-wave" x="48" y="3" fill="rgba(79,209,197,0.5)" />
                <use xlinkHref="#gentle-wave" x="48" y="5" fill="rgba(79,209,197,0.3)" />
                <use xlinkHref="#gentle-wave" x="48" y="7" fill="#4FD1C5" />
              </g>
            </svg>
          </div>
        </section>

        {/* Doctors Slider Section */}
        <section id="doctors" className="w-full bg-white py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-gray-800 mb-4 text-center">تعرف على نخبة من أطبائنا</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-12 text-center">
              اختر من بين أفضل الأطباء والمتخصصين في مصر لبدء رحلتك الصحية.
            </p>
            
            <div className="relative mx-auto px-4" style={{ maxWidth: '900px' }}>
              <div className="relative w-full overflow-hidden rounded-xl bg-white shadow-lg">
                <canvas 
                  ref={canvasRef} 
                  id="doctorCardCanvas" 
                  className="mx-auto w-full max-w-4xl"
                  style={{ height: '500px' }}
                />
                
                <button 
                  onClick={nextDoctor} 
                  className="absolute top-1/2 -translate-y-1/2 right-2 bg-white/80 hover:bg-white rounded-full p-1.5 shadow-sm transition-all duration-300 hover:shadow-md z-10"
                  aria-label="Next doctor"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-600">
                    <path d="m9 18 6-6-6-6" />
                  </svg>
                </button>
                
                <button 
                  onClick={prevDoctor} 
                  className="absolute top-1/2 -translate-y-1/2 left-2 bg-white/80 hover:bg-white rounded-full p-1.5 shadow-sm transition-all duration-300 hover:shadow-md z-10"
                  aria-label="Previous doctor"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-600">
                    <path d="m15 18-6-6 6-6" />
                  </svg>
                </button>
              </div>
              
              <div className="flex justify-center space-x-2 mt-6 space-x-reverse">
                {doctorsData.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToDoctor(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentIndex ? 'bg-teal-500 scale-110' : 'bg-gray-300 hover:bg-gray-400'}`}
                    aria-label={`Go to doctor ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-16 bg-gray-50 w-full">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">خدمات شُريان الصحية المتكاملة</h2>
              <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                نقدم لك منظومة رعاية صحية متكاملة تبدأ من لحظة شعورك بالتعب وحتى وصول الدواء إليك، كل ذلك وأنت في مكانك.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
              {/* Service Card 1 */}
              <div className="group bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 h-full flex flex-col">
                <div className="bg-teal-50 w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.75">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3 text-center">بحث سهل وحجز فوري</h3>
                <p className="text-gray-600 text-right leading-relaxed flex-grow">
                  اعثر على نخبة الأطباء في مختلف التخصصات واحجز موعدك بضغطة زر، لتجربة طبية أسرع وأكثر سلاسة.
                </p>
              </div>
              
              {/* Service Card 2 */}
              <div className="group bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 h-full flex flex-col">
                <div className="bg-teal-50 w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.75">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3 text-center">ملفك الطبي الرقمي</h3>
                <p className="text-gray-600 text-right leading-relaxed flex-grow">
                  احتفظ بتاريخك الصحي، نتائج تحاليلك، ووصفاتك الطبية في مكان واحد آمن، يسهل الوصول إليه في أي وقت.
                </p>
              </div>
              
              {/* Service Card 3 */}
              <div className="group bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 h-full flex flex-col">
                <div className="bg-teal-50 w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.75">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3 text-center">صيدلية إلكترونية متكاملة</h3>
                <p className="text-gray-600 text-right leading-relaxed flex-grow">
                  اطلب دوائك بسهولة من خلال التطبيق ليصلك في أسرع وقت. خدمة توصيل آمنة تضمن راحتك وخصوصيتك.
                </p>
              </div>
              
              {/* Service Card 4 */}
              <div className="group bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 h-full flex flex-col">
                <div className="bg-teal-50 w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.75">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3 text-center">خدمات التحاليل المتكاملة</h3>
                <p className="text-gray-600 text-right leading-relaxed flex-grow">
                  اختر أفضل المعامل، أو اطلب زيارة منزلية لسحب العينات بسهولة، وتابع نتائجك أونلاين.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Journey Section */}
        <section id="journey" className="py-20 bg-white w-full">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">رحلتك الصحية في ٤ خطوات</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-16">
              مع "شُريان"، صحتك على بعد خطوات قليلة.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
              <div className="flex flex-col items-center">
                <div className="bg-teal-100 text-teal-500 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-9 w-9" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">1. ابحث</h3>
                <p className="text-gray-600 leading-relaxed max-w-xs">
                  ابحث عن طبيبك بالتخصص، المنطقة أو حتى بالاسم بكل سهولة.
                </p>
              </div>
              <div className="flex flex-col items-center">
                <div className="bg-teal-100 text-teal-500 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-9 w-9" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 002 2h2a2 2 0 002-2" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">2. اختر</h3>
                <p className="text-gray-600 leading-relaxed max-w-xs">
                  اختر طبيبك المفضل من بين نخبة الأطباء المتاحين لك.
                </p>
              </div>
              <div className="flex flex-col items-center">
                <div className="bg-teal-100 text-teal-500 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-9 w-9" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">3. حجز</h3>
                <p className="text-gray-600 leading-relaxed max-w-xs">
                  احجز موعدك مباشرة من خلال التطبيق أو من خلال الهاتف.
                </p>
              </div>
              <div className="flex flex-col items-center">
                <div className="bg-teal-100 text-teal-500 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-9 w-9" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">4. الرعاية</h3>
                <p className="text-gray-600 leading-relaxed max-w-xs">
                  استلم الرعاية الطبية من طبيبك المفضل في مكانك المفضل.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-20 bg-gray-50 w-full">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">ماذا يقول مرضانا عنا؟</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-16">
              آراء من وثقوا في "شريان" لتلبية احتياجاتهم الصحية.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              
              {/* Testimonial Card 1 */}
              <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 relative">
                <svg className="absolute top-6 right-6 w-12 h-12 text-teal-100" fill="currentColor" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><path d="M9.333 22.667h4L16 16V9.333H9.333v13.334zm13.334 0h4L29.333 16V9.333h-6.666v13.334z"/></svg>
                <p className="text-gray-600 leading-relaxed mb-6 relative z-10">
                  "كنت قلقًا من فكرة سحب العينات في البيت، لكن الممرض كان محترف جدًا والنتائج ظهرت على حسابي في وقت قياسي."
                </p>
                <div className="flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-teal-100 flex items-center justify-center mr-4 ml-4">
                    <span className="text-teal-600 font-bold text-xl">M</span>
                  </div>
                  <div>
                    <p className="font-bold text-gray-800 text-lg">محمد خليل</p>
                    <div className="flex items-center justify-center mt-1">
                      {/* 5 Stars */}
                      <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                      <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                      <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                      <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                      <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Testimonial Card 2 */}
              <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 relative">
                <svg className="absolute top-6 right-6 w-12 h-12 text-teal-100" fill="currentColor" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><path d="M9.333 22.667h4L16 16V9.333H9.333v13.334zm13.334 0h4L29.333 16V9.333h-6.666v13.334z"/></svg>
                <p className="text-gray-600 leading-relaxed mb-6 relative z-10">
                  "خدمة توصيل الدواء كانت سريعة جدًا ومريحة، خصوصًا وإني كنت تعبانة ومش قادرة أنزل. التطبيق سهل وبسيط."
                </p>
                <div className="flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-teal-100 flex items-center justify-center mr-4 ml-4">
                    <span className="text-teal-600 font-bold text-xl">F</span>
                  </div>
                  <div>
                    <p className="font-bold text-gray-800 text-lg">فاطمة الزهراء</p>
                    <div className="flex items-center justify-center mt-1">
                      {/* 5 Stars */}
                      <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                      <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                      <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                      <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                      <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Testimonial Card 3 */}
              <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 relative">
                <svg className="absolute top-6 right-6 w-12 h-12 text-teal-100" fill="currentColor" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><path d="M9.333 22.667h4L16 16V9.333H9.333v13.334zm13.334 0h4L29.333 16V9.333h-6.666v13.334z"/></svg>
                <p className="text-gray-600 leading-relaxed mb-6 relative z-10">
                  "تجربة رائعة! قدرت أحجز مع دكتور ممتاز في دقايق والمتابعة كانت أسهل من ما توقعت. شكرًا شريان."
                </p>
                <div className="flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-teal-100 flex items-center justify-center mr-4 ml-4">
                    <span className="text-teal-600 font-bold text-xl">A</span>
                  </div>
                  <div>
                    <p className="font-bold text-gray-800 text-lg">أحمد المصري</p>
                    <div className="flex items-center justify-center mt-1">
                      {/* 5 Stars */}
                      <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                      <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                      <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                      <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                      <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Join As Doctor Section */}
        <section id="join-doctors" className="w-full bg-white py-16">
          <div className="container mx-auto px-6">
            <DoctorJoinCard />
          </div>
        </section>
      </main>
    </div>
  );
};

export default HomePage;
