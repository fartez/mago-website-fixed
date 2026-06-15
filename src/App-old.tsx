import { useState } from 'react';
import { Facebook, Youtube, Twitter, Phone, Mail, MapPin, Menu, X } from 'lucide-react';

function App() {
  const [showModal, setShowModal] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Header Top Bar */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-end gap-4 py-2 flex-wrap">
            <a href="https://www.facebook.com/eyeclinicMaGo" target="_blank" rel="noopener noreferrer" className="hover:opacity-80">
              <Facebook className="w-6 h-6 text-blue-600" />
            </a>
            <a href="https://www.youtube.com/channel/UCfWbr2cXHIoHqQPgGphWR0Q" target="_blank" rel="noopener noreferrer" className="hover:opacity-80">
              <Youtube className="w-6 h-6 text-red-600" />
            </a>
            <a href="https://twitter.com/EyentMago" target="_blank" rel="noopener noreferrer" className="hover:opacity-80">
              <Twitter className="w-6 h-6 text-blue-400" />
            </a>
            <div className="font-bold text-sm">
              Viber / WhatsApp: <a href="tel:+995599506507" className="hover:text-blue-600">(+995) 599 506 507</a>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Bar */}
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            <a href="#" className="flex items-center">
              <img
                src="/images/small_logo.png"
                alt="Mago Clinic"
                className="h-12 md:h-16 w-auto max-w-[200px] md:max-w-[370px]"
              />
            </a>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center gap-6">
              <a href="#" className="hover:text-blue-600 font-medium">მთავარი</a>
              <div className="relative group">
                <button className="hover:text-blue-600 font-medium">მაგოთერაპია ▾</button>
                <div className="absolute hidden group-hover:block bg-white shadow-lg rounded-md mt-2 py-2 min-w-[200px]">
                  <a href="#" className="block px-4 py-2 hover:bg-gray-100">მკურნალობა</a>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-100">მაგოთერაპია</a>
                </div>
              </div>
              <a href="#" className="hover:text-blue-600 font-medium">შეკითხვები</a>
              <div className="relative group">
                <button className="hover:text-blue-600 font-medium">გალერეა ▾</button>
                <div className="absolute hidden group-hover:block bg-white shadow-lg rounded-md mt-2 py-2 min-w-[200px]">
                  <a href="#" className="block px-4 py-2 hover:bg-gray-100">ფოტო გალერეა</a>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-100">ვიდეო გალერეა</a>
                </div>
              </div>
              <div className="relative group">
                <button className="hover:text-blue-600 font-medium">შედეგები ▾</button>
                <div className="absolute hidden group-hover:block bg-white shadow-lg rounded-md mt-2 py-2 min-w-[200px]">
                  <a href="#" className="block px-4 py-2 hover:bg-gray-100">ზოგადი</a>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-100">სიელმე</a>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-100">პიგმენტური რეტინიტი</a>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-100">ამბლიოპია</a>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-100">გლაუკომა</a>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-100">ასტიგმატიზმი</a>
                </div>
              </div>
              <a href="#" className="hover:text-blue-600 font-medium">ჩვენს შესახებ</a>
              <a href="#" className="hover:text-blue-600 font-medium">კონტაქტი</a>
              <div className="flex gap-2 ml-4">
                <button className="w-8 h-6 bg-gray-200 rounded hover:bg-gray-300 text-xs font-bold">GE</button>
                <button className="w-8 h-6 bg-gray-200 rounded hover:bg-gray-300 text-xs font-bold">EN</button>
                <button className="w-8 h-6 bg-gray-200 rounded hover:bg-gray-300 text-xs font-bold">RU</button>
              </div>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="lg:hidden pb-4">
              <a href="#" className="block py-2 hover:text-blue-600 font-medium">მთავარი</a>
              <a href="#" className="block py-2 hover:text-blue-600 font-medium">მაგოთერაპია</a>
              <a href="#" className="block py-2 hover:text-blue-600 font-medium">შეკითხვები</a>
              <a href="#" className="block py-2 hover:text-blue-600 font-medium">გალერეა</a>
              <a href="#" className="block py-2 hover:text-blue-600 font-medium">შედეგები</a>
              <a href="#" className="block py-2 hover:text-blue-600 font-medium">ჩვენს შესახებ</a>
              <a href="#" className="block py-2 hover:text-blue-600 font-medium">კონტაქტი</a>
            </div>
          )}
        </div>
      </nav>

      {/* Banner Notice */}
      <div className="bg-[#00265E] text-white text-center py-2 text-sm font-bold hidden md:block">
        მიღება მხოლოდ წინასწარი ჩაწერით
      </div>

      {/* Floating Appointment Button */}
      <button
        onClick={() => setShowModal(true)}
        className="fixed right-6 bottom-6 bg-[#00265E] text-white px-6 py-4 rounded-xl shadow-2xl hover:bg-[#003366] transition-all z-40 text-center"
      >
        <div className="text-2xl mb-2">✏️</div>
        <div className="text-sm font-bold leading-tight">
          ექიმთან<br />მიღებაზე<br />ჩაწერა
        </div>
      </button>

      {/* First Hero Section - Neurofinal Image - Desktop */}
      <div className="hidden md:block relative h-[350px] overflow-hidden">
        {/* Neurofinal Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(/images/neurofinal.jpg)',
          }}
        >
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-black/40" />
        </div>

        {/* Content Overlay */}
        <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
          <div className="text-white max-w-2xl">
            <h2 className="text-4xl font-extrabold leading-tight mb-4 drop-shadow-lg">
              მიღება მხოლოდ<br />წინასწარი ჩაწერით
            </h2>
          </div>
        </div>
      </div>

      {/* Video Section - Desktop */}
      <div className="hidden md:block bg-[#00265E] text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-[1fr_2fr_1fr] gap-6 items-center max-w-6xl mx-auto">
            <div className="text-right">
              <p className="text-base font-bold leading-snug">
                აპარატურული პერსონიფიცირებული<br />
                მკურნალობა
              </p>
            </div>

            <div>
              <div className="aspect-video rounded-lg overflow-hidden shadow-2xl">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/aZ9hcOnSCnM"
                  frameBorder="0"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
            </div>

            <div className="text-left">
              <p className="text-base font-bold leading-snug">
                ქირურგიის და მედიკამენტების გარეშე
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* First Hero Section - Neurofinal Image - Mobile */}
      <div className="md:hidden relative h-[250px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(/images/neurofinal.jpg)',
          }}
        >
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="relative z-10 px-4 h-full flex items-center">
          <div className="text-white">
            <h2 className="text-2xl font-extrabold leading-tight mb-3 drop-shadow-lg">
              მიღება მხოლოდ<br />წინასწარი ჩაწერით
            </h2>
          </div>
        </div>
      </div>

      {/* Video Section - Mobile */}
      <div className="md:hidden bg-[#00265E] text-white px-4 py-6">
        <div className="max-w-lg mx-auto">
          <p className="text-center text-base font-bold mb-3">
            <strong>თვალის კლინიკა • აპარატურული მკურნალობა</strong><br />
            მხედველობის აღდგენა მაგოთერაპიით
          </p>
          <div className="aspect-video rounded-lg overflow-hidden mb-3">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/aZ9hcOnSCnM"
              frameBorder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
          <p className="text-center text-base font-bold">
            თვალის არაქირურგიული მკურნალობა თბილისში
          </p>
        </div>
      </div>

      {/* Second Hero Section - Desktop */}
      <div className="hidden md:block bg-[#00265E] text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-6">
            <h1 className="text-4xl font-bold mb-3">მხედველობის აღდგენა მაგოთერაპიით</h1>
            <p className="text-lg opacity-95">შედეგი ტესტირებიდან 1 საათში — გართულების და რისკის გარეშე — სტაბილური შედეგი</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 items-start">
            <div>
              <img
                src="/images/agidginet_mx(1).jpg"
                alt="Magotherapy"
                className="rounded-2xl shadow-2xl w-full"
              />
            </div>

            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
              <h2 className="text-2xl font-extrabold mb-4">დროით გამოცდილი ბუნებრივი მეთოდი!</h2>
              <div className="text-lg leading-relaxed space-y-2">
                <p><strong>კანის ზემოდან განთავსებული აპარატურით,</strong></p>
                <p><strong>ქირურგიისა და მედიკამენტების გარეშე,</strong></p>
                <p><strong>ისეთი დაავადებების დროსაც,</strong></p>
                <p className="mb-4"><strong>რომელიც არ იკურნება!</strong></p>
                <p className="opacity-95"><strong>მაგოთერაპია დაცულია საერთაშორისო პატენტებით,</strong> რაც მეტყველებს მის ეფექტურობასა და უვნებლობაზე.</p>
              </div>

              <div className="mt-6 flex gap-4">
                <button
                  onClick={() => setShowModal(true)}
                  className="bg-white text-[#00265E] px-6 py-3 rounded-xl font-extrabold text-lg hover:bg-gray-100 transition"
                >
                  კონსულტაცია
                </button>
                <button className="bg-transparent border-2 border-white/85 text-white px-6 py-3 rounded-xl font-extrabold text-lg hover:bg-white/10 transition">
                  კონტაქტი
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Second Hero Section - Mobile */}
      <div className="md:hidden bg-[#00265E] text-white px-4 py-6">
        <div className="max-w-lg mx-auto text-center">
          <h1 className="text-3xl font-extrabold mb-3">მხედველობის აღდგენა მაგოთერაპიით</h1>
          <p className="text-base leading-relaxed opacity-95 mb-4">შედეგი ტესტირებიდან 1 საათში — გართულების და რისკის გარეშე — სტაბილური შედეგი</p>

          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 text-left mb-4">
            <h2 className="text-xl font-extrabold mb-3">დროით გამოცდილი ბუნებრივი მეთოდი!</h2>
            <div className="text-base leading-relaxed space-y-2">
              <p>• კანის ზემოდან განთავსებული აპარატურით,</p>
              <p>• ქირურგიის და მედიკამენტების გარეშე</p>
              <p>• ისეთი დაავადებების დროსაც, რომელიც არ იკურნება!</p>
              <p>• დაცულია საერთაშორისო პატენტებით</p>
            </div>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="w-full bg-white text-[#00265E] px-6 py-3 rounded-xl font-extrabold text-lg mb-3 hover:bg-gray-100 transition"
          >
            კონსულტაცია
          </button>
          <button className="w-full bg-transparent border-2 border-white/85 text-white px-6 py-3 rounded-xl font-extrabold text-lg hover:bg-white/10 transition">
            კონტაქტი
          </button>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-[#D7EDF6] py-8">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-extrabold text-[#003366] text-center mb-6">
            1996 წლიდან 2025 წლამდე ± 10000-ზე მეტ პაციენტს ვუმკურნალეთ კანის ზემოდან განთავსებული აპარატურით.
          </h2>

          {/* Desktop Grid */}
          <div className="hidden md:grid md:grid-cols-3 gap-4 max-w-6xl mx-auto">
            <FeatureCard icon="🚫" text="არ ვიყენებთ მედიკამენტებსა და ქირურგიას." />
            <FeatureCard icon="👥" text="დაავადების ხანგრძლივობას და პაციენტის ასაკს მნიშვნელობა არ აქვს." />
            <FeatureCard icon="✅" text="გამორიცხულია რისკი, ალერგია, გართულებები და გვერდითი მოვლენები." />
            <FeatureCard icon="⚡" text="ინოვაციური აპარატურით ვაღორძინებთ ორგანიზმის რესურსებს." />
            <FeatureCard icon="⏱️" text="97%-ში მხედველობის აღდგენა ხდება ტესტირებიდან 1 საათში." />
            <FeatureCard icon="🏆" text="დაცულია საერთაშორისო პატენტებით." />
          </div>

          {/* Mobile Stack */}
          <div className="md:hidden space-y-3 max-w-lg mx-auto">
            <FeatureCard icon="🚫" text="არ ვიყენებთ მედიკამენტებსა და ქირურგიას." />
            <FeatureCard icon="⚡" text="ინოვაციური აპარატურით ვაღორძინებთ ორგანიზმის რესურსებს." />
            <FeatureCard icon="👥" text="დაავადების ხანგრძლივობას და ასაკს მნიშვნელობა არ აქვს." />
            <FeatureCard icon="⏱️" text="97%-ში მხედველობის აღდგენა ხდება ტესტირებიდან 1 საათში." />
            <FeatureCard icon="✅" text="გამორიცხულია რისკი, ალერგია, გართულებები და გვერდითი მოვლენები." />
            <FeatureCard icon="🏆" text="დაცულია საერთაშორისო პატენტებით." />
          </div>
        </div>
      </div>

      {/* Dark Title Strip */}
      <div className="bg-[#00265E] text-white text-center py-4">
        <h2 className="text-2xl font-black px-4">
          მაგოთერაპია — (აპარატურული მკურნალობა) — წინსვლა მხედველობის აღდგენაში!
        </h2>
      </div>

      {/* About Magotherapy */}
      <div className="bg-[#D7EDF6] py-8">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="bg-white rounded-2xl p-6">
            <div className="text-lg leading-relaxed text-black space-y-4">
              <p>
                <strong>მაკა გოგიაშვილის თერაპია — მაგოთერაპია</strong> და <strong>თვალის კლინიკა ახალი ტექნოლოგიები — MaGo</strong>, თბილისი (საქართველო) შეიქმნა იმისათვის, რომ დაუბრუნოს პაციენტებს მხედველობა, განსაკუთრებით იმ დაავადებების დროს, რომელთა მკურნალობაც დღეს უშედეგოა.
              </p>
              <p>
                მაგოთერაპია გვაძლევს მოკლე დროში პოზიტიურ შედეგს სხვადასხვა ტიპის და სიმძიმის დაავადებათა მკურნალობისას.
              </p>
              <p>
                პირველივე ვიზიტისას 97% სიზუსტით ვაძლევთ პროგნოზს მოსალოდნელ შედეგზე. 1 საათში მიღებულ შედეგს სჭირდება გამყარება 10-14 დღის განმავლობაში (ინდივიდუალურად).
              </p>
              <p>
                მაგოთერაპიის შედეგი სტაბილურია <strong>18–20 წლის</strong> განმავლობაში.
              </p>
            </div>

            <div className="text-right mt-6">
              <a href="#" className="inline-block bg-white border border-[#003366] text-[#003366] px-4 py-2 rounded-lg font-black hover:bg-gray-50 transition">
                იხილეთ მეტი → მაგოთერაპია
              </a>
            </div>
          </div>

          {/* Checklist */}
          <div className="max-w-lg mx-auto mt-6 space-y-3">
            <ChecklistItem text="1996 წლიდან 2025 წლამდე +-10000-ზე მეტ პაციენტს აღვუდგინეთ მხედველობა." />
            <ChecklistItem text="არ ვიყენებთ მედიკამენტებსა და ქირურგიას. ვმკურნალობთ მხოლოდ აპარატურით." />
            <ChecklistItem text="97%-ში მხედველობის აღდგენა ხდება ტესტირებიდან 1 საათში." />
            <ChecklistItem text="გამორიცხულია გართულებები, რისკი და ალერგია." />
            <ChecklistItem text="დაცულია საერთაშორისო პატენტებით." />
          </div>
        </div>
      </div>

      {/* Doctor Section */}
      <div className="bg-[#00265E] text-white py-6">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="grid md:grid-cols-2 gap-6 items-center">
            <div className="hidden md:block">
              <img
                src="/images/avtori.jpg"
                alt="Doctor Maka Gogiashvili"
                className="rounded-2xl shadow-2xl w-full max-w-sm"
              />
            </div>

            <div>
              <h2 className="text-2xl font-black mb-3">ექიმი მაკა გოგიაშვილი</h2>
              <p className="text-base leading-relaxed opacity-95">
                12 გამოგონების და მაგოთერაპიის ავტორი, მედ. მეცნ. დოქტორი, ევროპელ ოფთალმოლოგთა საბჭოს წევრი, ამერიკის სამეცნიერო და ოფთალმოლოგიური აკადემიების ქმედითი წევრი, კლინიკის ხელმძღვანელი.
              </p>
              <p className="text-base leading-relaxed opacity-95 mt-3">
                მაგოთერაპია დროით გამოცდილი ბუნებრივი მეთოდია და აღადგენს მხედველობას 1996 წლიდან!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Magotherapy 3-Column */}
      <div className="py-8 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-4xl font-black text-[#003366] text-center mb-6">მაგოთერაპია</h2>

          {/* Desktop 3-col */}
          <div className="hidden md:grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-5xl mb-4">🔬</div>
              <p className="text-base"><strong>ინოვაციური აპარატურით</strong> (კანის ზემოდან), ხდება მხედველობის აღდგენა ბუნებრივად, ქირურგიის და მედიკამენტების გარეშე.</p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4">⚡</div>
              <p className="text-base"><strong>1 საათში შედეგი</strong> განპირობებულია ნივთიერებათა ცვლის გააქტიურებით და ნერვული იმპულსის გატარების დაჩქარებით (0.002 წმ).</p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4">🛡️</div>
              <p className="text-base"><strong>ტვინის ვარჯიში</strong> — მკურნალობისას ,    ტვინი  სწავლობს  “ გაღვიძებული „   უჯრედებიდან წარმოქმნილ  ნეიროიმპულსის  გადამუშავებას,   ხდება  მხედველობის ანალიზატორის   აქტივაცია  რის შედეგადაც,   ხშირად  მხედველობა კვლავ მატულობს და ხდება მიღებული შედეგის გამყარება  მხედველობის ფუნქციონალურ აღდგენასთან  ერთად</p>
            </div>
          </div>

          {/* Mobile stack */}
          <div className="md:hidden space-y-4 max-w-lg mx-auto">
            <MagoCard icon="🔬" title=" აღვადგენთ  ორგანიზმის რესურს" text="კანის ზემოდან განთავსებული აპარატურით ხდება მხედველობის აღდგენა ქირურგიის და მედიკამენტების გარეშე." />
            <MagoCard icon="⚡" title="უჯრედები იღვიძებენ" text="მხედველობის აღდგენა დაუჯრებლად მოკლე დროში  განპირობებულია უჯრედშიდა ნივთიერებათა ცვლის აღდგენით , რის შედეგადაც  წამის  2000  ნაწილში  უჯრედები გამოდიან „ ძილის“ ( პარაბიოზის )   მდგომარეობიდან, ხდება ნეირონის ფუნქციის  გააქტიურება. იგივე დროის მონაკვეთში     ტვინი  ღებულობს   და  გადაამუშავებს ამ ნერვულ იმპულს  და თვალს მკაფიო გამოსახულება უბრუნდება" />
            <MagoCard icon="🛡️" title="ტვინის ვარჯიში" text="მკურნალობისას ,    ტვინი  სწავლობს  “ გაღვიძებული „   უჯრედებიდან წარმოქმნილ  ნეიროიმპულსის  გადამუშავებას,   ხდება  მხედველობის ანალიზატორის   აქტივაცია  რის შედეგადაც,   ხშირად  მხედველობა კვლავ მატულობს და ხდება მიღებული შედეგის გამყარება  მხედველობის ფუნქციონალურ აღდგენასთან  ერთად" />
          </div>

          <p className="text-center text-lg font-black text-[#003366] mt-8">
            მაგოთერაპია აღადგენს მხედველობას ისეთი დაავადებების დროსაც, რომელიც ითვლება განუკურნებლად.
          </p>
        </div>
      </div>

      {/* Disease Icons - Desktop */}
      <div className="hidden md:block py-6 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-5 gap-4 max-w-6xl mx-auto">
            <DiseaseCard name="ამბლიოპია" color="bg-purple-100" />
            <DiseaseCard name="პიგმენტური რეტინიტი" color="bg-blue-100" />
            <DiseaseCard name="სიელმე" color="bg-green-100" />
            <DiseaseCard name="ასტიგმატიზმი" color="bg-yellow-100" />
            <DiseaseCard name="გლაუკომა" color="bg-red-100" />
          </div>
        </div>
      </div>

      {/* Disease Icons - Mobile */}
      <div className="md:hidden py-6 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 gap-4 max-w-lg mx-auto">
            <DiseaseCard name="ამბლიოპია" color="bg-purple-100" />
            <DiseaseCard name="პიგმენტური რეტინიტი" color="bg-blue-100" />
            <DiseaseCard name="სიელმე" color="bg-green-100" />
            <DiseaseCard name="ასტიგმატიზმი" color="bg-yellow-100" />
          </div>
          <div className="mt-4 flex justify-center">
            <DiseaseCard name="გლაუკომა" color="bg-red-100" />
          </div>
        </div>
      </div>

      {/* Clinic Section */}
      <div className="bg-[#D7EDF6] py-8">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl font-black text-[#003366] text-center mb-6">
            კლინიკა ახალი ტექნოლოგიები MaGo
          </h2>

          <div className="bg-white rounded-2xl p-6">
            <div className="md:float-right md:ml-6 mb-4 md:mb-0 md:w-96">
              <img
                src="/images/mozg.jpg"
                alt="Clinic"
                className="rounded-xl w-full"
              />
            </div>

            <div className="text-base leading-relaxed text-black space-y-4">
              <p>
                1996 წლიდან 2025 წლამდე ჩვენ ვუმკურნალეთ +-10000-ზე მეტ პაციენტს. ამ წლების მანძილზე დაგვიგროვდა გამოცდილება ინდივიდუალური მკურნალობის სქემის შექმნაში, რამაც განაპირობა შედეგის სტაბილურობა 18–20 წლის განმავლობაში.
              </p>
              <p>
                მაგოთერაპია შექმნილია იმისათვის, რომ დავეხმაროთ როგორც თვალის ბანალური დაავადებების დროს, აგრეთვე იმედდაკარგულ პაციენტებს მხედველობის აღდგენაში სხვადასხვა თვალის სნეულებების დროს.
              </p>
            </div>

            <div style={{ clear: 'both' }}></div>

            <div className="text-right mt-6">
              <a href="#" className="inline-block bg-white border border-[#003366] text-[#003366] px-4 py-2 rounded-lg font-black hover:bg-gray-50 transition">
                იხილეთ მეტი → კლინიკის შესახებ
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Title Strip */}
      <div className="bg-[#00265E] text-white text-center py-6">
        <h2 className="text-3xl font-black mb-2 px-4">მაგოთერაპია აღმიდგენს მხედველობას?</h2>
        <h2 className="text-3xl font-black px-4">რა შედეგს შეიძლება ველოდო?</h2>
      </div>

      {/* Resource Section */}
      <div className="bg-[#D7EDF6] py-8">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="bg-white rounded-2xl p-6">
            <div className="md:float-right md:ml-6 mb-4 md:mb-0 md:w-80 hidden md:block">
              <img
                src="/images/phototvali(1)_(1).jpg"
                alt="Eye Treatment"
                className="rounded-xl w-full"
              />
            </div>

            <div className="text-base leading-relaxed text-black space-y-4">
              <p>
                მრავალწლიანი სამეცნიერო კვლევების საფუძველზე დადგინდა, რომ ნებისმიერ ორგანიზმს გააჩნია გამოუყენებელი ფარული რესურსი.
              </p>
              <p>
                ჩვენს მიერ შემუშავებული ავტორიზებული მეთოდიკით ხდება კონკრეტული ორგანიზმის რესურსის მოძიება და მისი აღორძინება — ასაკის, დაავადების სირთულისა და ხანგრძლივობის მიუხედავად.
              </p>
              <p>
                პირველივე ვიზიტისას ვაძლევთ პროგნოზს მოსალოდნელ შედეგზე. 2–3 ვიზიტის შემდეგ პაციენტი უკვე ყოველდღიურად აღიქვამს მომატებულ მხედველობას, რომელსაც სჭირდება გამყარება 5–10 დღის განმავლობაში (ინდივიდუალურად).
              </p>
            </div>

            <div style={{ clear: 'both' }}></div>

            <div className="mt-6">
              <button
                onClick={() => setShowModal(true)}
                className="bg-[#00265E] text-white px-6 py-3 rounded-xl font-black text-lg hover:bg-[#003366] transition"
              >
                დაგვიკავშირდით დღესვე
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#00265E] text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Contact */}
            <div>
              <h4 className="text-xl font-bold mb-4">კონტაქტი</h4>
              <div className="h-1 w-16 bg-white/30 mb-6"></div>
              <img
                src="/images/small_logo.png"
                alt="Mago Clinic"
                className="h-10 w-auto max-w-[250px] mb-6"
              />

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 mt-1 flex-shrink-0" />
                  <span>(+995) 599 506 507</span>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 mt-1 flex-shrink-0" />
                  <span className="break-all">doctormago2018@gmail.com</span>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 mt-1 flex-shrink-0" />
                  <span>თბილისი, ანნა პოლიტკოვსკაის ქუჩა (ჯიქია) 4 გ. ჯიქია რეზიდენსი. მეტრო სახელმწიფო უნივერსიტეტი</span>
                </div>
              </div>
            </div>

            {/* Menu */}
            <div>
              <h4 className="text-xl font-bold mb-4">მენიუ</h4>
              <div className="h-1 w-16 bg-white/30 mb-6"></div>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-gray-300">მთავარი</a></li>
                <li><a href="#" className="hover:text-gray-300">მაგოთერაპია</a></li>
                <li><a href="#" className="hover:text-gray-300">შეკითხვები</a></li>
                <li><a href="#" className="hover:text-gray-300">გალერეა</a></li>
                <li><a href="#" className="hover:text-gray-300">შედეგები</a></li>
                <li><a href="#" className="hover:text-gray-300">ჩვენს შესახებ</a></li>
                <li><a href="#" className="hover:text-gray-300">კონტაქტი</a></li>
              </ul>
            </div>

            {/* Social */}
            <div>
              <h4 className="text-xl font-bold mb-4">შემოგვიერთდით</h4>
              <div className="h-1 w-16 bg-white/30 mb-6"></div>
              <p className="mb-4">თვალი ადევნე ჩვენს სოციალურ მედიას!</p>

              <div className="flex flex-wrap gap-4">
                <a href="https://www.facebook.com/eyeclinicMaGo" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 border border-white/35 px-3 py-1 rounded-lg hover:bg-white hover:text-[#00265E] transition">
                  <Facebook className="w-5 h-5" />
                  <span className="font-bold text-sm">Follow</span>
                </a>
                <a href="https://www.youtube.com/channel/UCfWbr2cXHIoHqQPgGphWR0Q" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 border border-white/35 px-3 py-1 rounded-lg hover:bg-white hover:text-[#00265E] transition">
                  <Youtube className="w-5 h-5" />
                  <span className="font-bold text-sm">Subscribe</span>
                </a>
                <a href="https://twitter.com/EyentMago" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 border border-white/35 px-3 py-1 rounded-lg hover:bg-white hover:text-[#00265E] transition">
                  <Twitter className="w-5 h-5" />
                </a>
              </div>

              <div className="mt-6 text-sm font-bold text-center">
                ვიზიტორთა რაოდენობა – <strong>48,142</strong>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Appointment Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="bg-[#00265E] text-white p-6 rounded-t-xl flex justify-between items-center">
              <h3 className="text-xl font-bold">ექიმთან მიღებაზე ჩაწერა</h3>
              <button onClick={() => setShowModal(false)} className="text-white hover:text-gray-300">
                <X size={24} />
              </button>
            </div>

            <form className="p-6 space-y-4">
              <div>
                <label className="block font-bold mb-2">სასურველი თარიღი</label>
                <input type="date" className="w-full border border-gray-300 rounded-lg px-4 py-2" required />
              </div>

              <div>
                <label className="block font-bold mb-2">სახელი გვარი</label>
                <input type="text" className="w-full border border-gray-300 rounded-lg px-4 py-2" required />
              </div>

              <div>
                <label className="block font-bold mb-2">email</label>
                <input type="email" className="w-full border border-gray-300 rounded-lg px-4 py-2" required />
              </div>

              <div>
                <label className="block font-bold mb-2">ტელეფონი</label>
                <input type="tel" className="w-full border border-gray-300 rounded-lg px-4 py-2" required />
              </div>

              <div>
                <label className="block font-bold mb-2">ასაკი</label>
                <input type="number" className="w-full border border-gray-300 rounded-lg px-4 py-2" required />
              </div>

              <div>
                <label className="block font-bold mb-2">მე ვარ</label>
                <select className="w-full border border-gray-300 rounded-lg px-4 py-2">
                  <option value="">----- აირჩიეთ -----</option>
                  <option value="პაციენტი">პაციენტი</option>
                  <option value="ოჯახის წევრი">ოჯახის წევრი</option>
                  <option value="მეგობარი">მეგობარი</option>
                </select>
              </div>

              <div>
                <label className="block font-bold mb-2">დაავადების ისტორია</label>
                <textarea className="w-full border border-gray-300 rounded-lg px-4 py-2 h-32" />
              </div>

              <div className="flex items-start gap-2">
                <input type="checkbox" required className="mt-1" />
                <span className="text-sm">ვეთანხმები შიდა პოლიტიკას</span>
              </div>

              <button type="submit" className="w-full bg-[#00265E] text-white py-3 rounded-lg font-bold hover:bg-[#003366] transition">
                გაგზავნა
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// Helper Components
function FeatureCard({ icon, text }: { icon: string; text: string }) {
  return (
    <div className="bg-white rounded-xl p-4 flex items-start gap-3">
      <div className="text-3xl flex-shrink-0">{icon}</div>
      <p className="text-base font-extrabold text-[#003366] leading-tight">{text}</p>
    </div>
  );
}

function ChecklistItem({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-3">
      <div className="text-green-600 text-2xl flex-shrink-0">✓</div>
      <p className="text-base">{text}</p>
    </div>
  );
}

function MagoCard({ icon, title, text }: { icon: string; title: string; text: string }) {
  return (
    <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
      <div className="flex items-center gap-3 mb-3">
        <div className="text-3xl">{icon}</div>
        <h3 className="font-black text-[#003366]">{title}</h3>
      </div>
      <p className="text-sm leading-relaxed">{text}</p>
    </div>
  );
}

function DiseaseCard({ name, color }: { name: string; color: string }) {
  return (
    <div className={`${color} rounded-xl p-6 text-center hover:shadow-lg transition cursor-pointer`}>
      <div className="text-3xl mb-2">👁️</div>
      <p className="font-bold text-sm">{name}</p>
    </div>
  );
}

export default App;
