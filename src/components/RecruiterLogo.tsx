import React from 'react';

interface RecruiterLogoProps {
  name: string;
  logoText?: string;
  className?: string;
  variant?: 'compact' | 'full' | 'cover';
}

export const RecruiterLogo: React.FC<RecruiterLogoProps> = ({
  name,
  logoText,
  className = 'w-full h-full',
  variant = 'full',
}) => {
  const query = `${name} ${logoText || ''}`.toLowerCase();

  // Helper container wrapper for responsive SVG scaling
  const wrap = (svg: React.ReactNode, title?: string) => (
    <div 
      className={`inline-flex items-center justify-center select-none ${className}`} 
      title={title || name}
    >
      {svg}
    </div>
  );

  // 1. Google
  if (query.includes('google')) {
    return wrap(
      <svg viewBox="0 0 160 40" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Google 4-Color G */}
        <g transform="translate(6, 6) scale(0.65)">
          <path d="M43.6 20.1H42V20H24v8h11.3c-1.6 4.7-6.1 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 8 3l5.7-5.7C34 6.1 29.3 4 24 4 13 4 4 13 4 24s9 20 20 20 20-9 20-20c0-1.3-.1-2.7-.4-3.9z" fill="#4285F4"/>
          <path d="M6.3 14.7l6.6 4.8C14.7 15.6 19 12 24 12c3.1 0 5.8 1.2 8 3l5.7-5.7C34 6.1 29.3 4 24 4 16.8 4 10.5 8.3 6.3 14.7z" fill="#EA4335"/>
          <path d="M24 44c5.2 0 9.9-2 13.4-5.3l-6.2-5.1C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.2-8L6.2 33C10.4 39.6 16.7 44 24 44z" fill="#34A853"/>
          <path d="M12.8 28c-.4-1.2-.6-2.6-.6-4s.2-2.8.6-4L6.2 15.2C4.8 18 4 20.9 4 24s.8 6 2.2 8.8l6.6-4.8z" fill="#FBBC05"/>
        </g>
        {/* Wordmark */}
        <text x="44" y="27" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="700" fontSize="21" letterSpacing="-0.5px">
          <tspan fill="#4285F4">G</tspan>
          <tspan fill="#EA4335">o</tspan>
          <tspan fill="#FBBC05">o</tspan>
          <tspan fill="#4285F4">g</tspan>
          <tspan fill="#34A853">l</tspan>
          <tspan fill="#EA4335">e</tspan>
        </text>
      </svg>,
      'Google'
    );
  }

  // 2. Microsoft
  if (query.includes('microsoft')) {
    return wrap(
      <svg viewBox="0 0 160 40" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g transform="translate(6, 9)">
          <rect x="0" y="0" width="10" height="10" fill="#F25022"/>
          <rect x="12" y="0" width="10" height="10" fill="#7FBA00"/>
          <rect x="0" y="12" width="10" height="10" fill="#00A4EF"/>
          <rect x="12" y="12" width="10" height="10" fill="#FFB900"/>
        </g>
        <text x="36" y="26" fill="#5E5E5E" fontFamily="system-ui, -apple-system, 'Segoe UI', sans-serif" fontWeight="600" fontSize="19" letterSpacing="-0.3px">
          Microsoft
        </text>
      </svg>,
      'Microsoft'
    );
  }

  // 3. Amazon / AWS
  if (query.includes('amazon') || query.includes('aws')) {
    return wrap(
      <svg viewBox="0 0 160 40" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        <text x="12" y="24" fill="#141920" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="800" fontSize="22" letterSpacing="-0.5px">
          amazon
        </text>
        <text x="100" y="16" fill="#FF9900" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="700" fontSize="10">
          aws
        </text>
        {/* Curved Smile Arrow */}
        <path d="M16 28 C 45 40, 75 38, 94 28" stroke="#FF9900" strokeWidth="2.8" strokeLinecap="round" fill="none"/>
        <path d="M91 25 L 96 28 L 92 32 Z" fill="#FF9900"/>
      </svg>,
      'Amazon AWS'
    );
  }

  // 4. Cisco
  if (query.includes('cisco')) {
    return wrap(
      <svg viewBox="0 0 160 40" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* 9 Bridge vertical bars */}
        <g transform="translate(10, 4)">
          <rect x="0" y="10" width="2.5" height="6" rx="1.2" fill="#049FD9"/>
          <rect x="5" y="7" width="2.5" height="9" rx="1.2" fill="#049FD9"/>
          <rect x="10" y="3" width="2.5" height="13" rx="1.2" fill="#049FD9"/>
          <rect x="15" y="7" width="2.5" height="9" rx="1.2" fill="#049FD9"/>
          <rect x="20" y="0" width="2.5" height="16" rx="1.2" fill="#049FD9"/>
          <rect x="25" y="7" width="2.5" height="9" rx="1.2" fill="#049FD9"/>
          <rect x="30" y="3" width="2.5" height="13" rx="1.2" fill="#049FD9"/>
          <rect x="35" y="7" width="2.5" height="9" rx="1.2" fill="#049FD9"/>
          <rect x="40" y="10" width="2.5" height="6" rx="1.2" fill="#049FD9"/>
        </g>
        <text x="60" y="27" fill="#049FD9" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="800" fontSize="21" letterSpacing="-0.5px">
          CISCO
        </text>
      </svg>,
      'Cisco'
    );
  }

  // 5. IBM
  if (query.includes('ibm')) {
    return wrap(
      <svg viewBox="0 0 160 40" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        <text x="24" y="29" fill="#1F70C1" fontFamily="Impact, 'Arial Black', sans-serif" fontWeight="900" fontSize="30" letterSpacing="4px">
          IBM
        </text>
        {/* Striped overlay imitation */}
        <line x1="20" y1="11" x2="98" y2="11" stroke="white" strokeWidth="1.8"/>
        <line x1="20" y1="15" x2="98" y2="15" stroke="white" strokeWidth="1.8"/>
        <line x1="20" y1="19" x2="98" y2="19" stroke="white" strokeWidth="1.8"/>
        <line x1="20" y1="23" x2="98" y2="23" stroke="white" strokeWidth="1.8"/>
        <line x1="20" y1="27" x2="98" y2="27" stroke="white" strokeWidth="1.8"/>
      </svg>,
      'IBM'
    );
  }

  // 6. Oracle
  if (query.includes('oracle')) {
    return wrap(
      <svg viewBox="0 0 160 40" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Rounded red pill */}
        <rect x="12" y="9" width="30" height="22" rx="11" fill="#F80000"/>
        <rect x="17" y="14" width="20" height="12" rx="6" fill="white"/>
        <text x="50" y="27" fill="#F80000" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="800" fontSize="20" letterSpacing="1px">
          ORACLE
        </text>
      </svg>,
      'Oracle'
    );
  }

  // 7. Intel
  if (query.includes('intel')) {
    return wrap(
      <svg viewBox="0 0 160 40" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        <text x="32" y="27" fill="#0068B5" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="800" fontSize="26" letterSpacing="-1px">
          intel
        </text>
        <rect x="34" y="8" width="4.5" height="4.5" fill="#00C7FD"/>
      </svg>,
      'Intel'
    );
  }

  // 8. Adobe
  if (query.includes('adobe')) {
    return wrap(
      <svg viewBox="0 0 160 40" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="14" y="8" width="24" height="24" rx="3" fill="#FA0F00"/>
        <path d="M22 13 L 26 23 L 30 13 Z M 16 13 L 23 27 L 16 27 Z M 36 13 L 29 27 L 36 27 Z" fill="white"/>
        <text x="46" y="26" fill="#FA0F00" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="700" fontSize="20" letterSpacing="0.5px">
          Adobe
        </text>
      </svg>,
      'Adobe'
    );
  }

  // 9. Salesforce
  if (query.includes('salesforce')) {
    return wrap(
      <svg viewBox="0 0 160 40" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M24 12 C 26 8, 33 8, 36 12 C 40 10, 45 13, 44 18 C 48 19, 48 25, 43 27 C 40 30, 20 30, 17 27 C 12 25, 13 18, 17 17 C 16 13, 21 10, 24 12 Z" fill="#00A1E0"/>
        <text x="52" y="25" fill="#00A1E0" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="700" fontSize="17" letterSpacing="-0.2px">
          salesforce
        </text>
      </svg>,
      'Salesforce'
    );
  }

  // 10. Tata Consultancy Services (TCS)
  if (query.includes('tcs') || query.includes('tata consultancy')) {
    return wrap(
      <svg viewBox="0 0 160 40" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* TATA Blue Mark */}
        <circle cx="22" cy="20" r="13" fill="#004B87"/>
        <path d="M14 13 L 30 13 M 22 13 L 22 27" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
        <text x="42" y="21" fill="#004B87" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="900" fontSize="17" letterSpacing="0.5px">
          TATA
        </text>
        <text x="42" y="29" fill="#1C3F73" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="700" fontSize="8" letterSpacing="1.2px">
          CONSULTANCY SERVICES
        </text>
      </svg>,
      'TCS (Tata Consultancy Services)'
    );
  }

  // 11. Infosys
  if (query.includes('infosys')) {
    return wrap(
      <svg viewBox="0 0 160 40" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        <text x="26" y="27" fill="#007CC3" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="800" fontSize="24" letterSpacing="-0.4px">
          Infosys
        </text>
        <circle cx="112" cy="14" r="2.5" fill="#FF8200"/>
      </svg>,
      'Infosys'
    );
  }

  // 12. Wipro
  if (query.includes('wipro')) {
    return wrap(
      <svg viewBox="0 0 160 40" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* 4 Multi-color dots */}
        <g transform="translate(14, 11)">
          <circle cx="4" cy="4" r="3.5" fill="#E03E52"/>
          <circle cx="14" cy="4" r="3.5" fill="#F18825"/>
          <circle cx="4" cy="14" r="3.5" fill="#00A88F"/>
          <circle cx="14" cy="14" r="3.5" fill="#2B547E"/>
        </g>
        <text x="42" y="26" fill="#2B547E" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="700" fontSize="21" letterSpacing="-0.5px">
          wipro
        </text>
      </svg>,
      'Wipro'
    );
  }

  // 13. Accenture
  if (query.includes('accenture')) {
    return wrap(
      <svg viewBox="0 0 160 40" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        <text x="14" y="26" fill="#1A1A1A" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="700" fontSize="21" letterSpacing="-0.5px">
          accenture
        </text>
        <path d="M104 12 L 110 18 L 104 24" stroke="#A100FF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      </svg>,
      'Accenture'
    );
  }

  // 14. Cognizant
  if (query.includes('cognizant')) {
    return wrap(
      <svg viewBox="0 0 160 40" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Arc Logo */}
        <g transform="translate(10, 8)">
          <circle cx="12" cy="12" r="10" stroke="#0033A0" strokeWidth="3.5" fill="none" strokeDasharray="50 15"/>
          <circle cx="18" cy="12" r="2.5" fill="#00A3E0"/>
        </g>
        <text x="40" y="26" fill="#0033A0" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="800" fontSize="19" letterSpacing="-0.2px">
          Cognizant
        </text>
      </svg>,
      'Cognizant'
    );
  }

  // 15. Capgemini
  if (query.includes('capgemini')) {
    return wrap(
      <svg viewBox="0 0 160 40" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Blue Spade */}
        <g transform="translate(10, 8)">
          <path d="M12 2 C 7 7, 3 13, 8 18 C 11 20, 13 18, 12 18 C 11 21, 10 22, 9 22 L 15 22 C 14 22, 13 21, 12 18 C 11 18, 13 20, 16 18 C 21 13, 17 7, 12 2 Z" fill="#0070AD"/>
        </g>
        <text x="36" y="25" fill="#0070AD" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="700" fontSize="18" letterSpacing="-0.3px">
          Capgemini
        </text>
      </svg>,
      'Capgemini'
    );
  }

  // 16. Deloitte
  if (query.includes('deloitte')) {
    return wrap(
      <svg viewBox="0 0 160 40" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        <text x="24" y="27" fill="#111111" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="800" fontSize="23" letterSpacing="-0.5px">
          Deloitte
        </text>
        <circle cx="109" cy="25" r="3" fill="#86BC25"/>
      </svg>,
      'Deloitte'
    );
  }

  // 17. Larsen & Toubro (L&T)
  if (query.includes('l&t') || query.includes('larsen')) {
    return wrap(
      <svg viewBox="0 0 160 40" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="24" cy="20" r="14" fill="#004B87"/>
        <text x="14" y="25" fill="white" fontFamily="serif" fontWeight="900" fontSize="14" letterSpacing="0.5px">
          L&amp;T
        </text>
        <text x="44" y="22" fill="#004B87" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="800" fontSize="14" letterSpacing="0.5px">
          LARSEN &amp; TOUBRO
        </text>
        <text x="44" y="30" fill="#666" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="600" fontSize="7" letterSpacing="1px">
          ENGINEERING &amp; TECHNOLOGY
        </text>
      </svg>,
      'Larsen & Toubro'
    );
  }

  // 18. Tata Power
  if (query.includes('tata power')) {
    return wrap(
      <svg viewBox="0 0 160 40" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="22" cy="20" r="13" fill="#004B87"/>
        <path d="M14 13 L 30 13 M 22 13 L 22 27" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
        <text x="42" y="26" fill="#004B87" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="900" fontSize="16" letterSpacing="0.8px">
          TATA POWER
        </text>
      </svg>,
      'Tata Power'
    );
  }

  // 19. Goldman Sachs
  if (query.includes('goldman')) {
    return wrap(
      <svg viewBox="0 0 160 40" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="12" y="6" width="28" height="28" fill="#1976D2" rx="3"/>
        <text x="15" y="19" fill="white" fontFamily="serif" fontWeight="700" fontSize="8">
          Goldman
        </text>
        <text x="15" y="28" fill="white" fontFamily="serif" fontWeight="700" fontSize="8">
          Sachs
        </text>
        <text x="46" y="25" fill="#1976D2" fontFamily="serif" fontWeight="700" fontSize="16" letterSpacing="0.2px">
          Goldman Sachs
        </text>
      </svg>,
      'Goldman Sachs'
    );
  }

  // 20. Morgan Stanley
  if (query.includes('morgan stanley')) {
    return wrap(
      <svg viewBox="0 0 160 40" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        <text x="16" y="25" fill="#002B49" fontFamily="serif" fontWeight="700" fontSize="17" letterSpacing="0.5px">
          Morgan Stanley
        </text>
      </svg>,
      'Morgan Stanley'
    );
  }

  // 21. Samsung
  if (query.includes('samsung')) {
    return wrap(
      <svg viewBox="0 0 160 40" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="80" cy="20" rx="66" ry="15" fill="#1428A0" transform="rotate(-6 80 20)"/>
        <text x="80" y="26" textAnchor="middle" fill="white" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="900" fontSize="18" letterSpacing="2px">
          SAMSUNG
        </text>
      </svg>,
      'Samsung'
    );
  }

  // 22. Siemens
  if (query.includes('siemens')) {
    return wrap(
      <svg viewBox="0 0 160 40" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        <text x="24" y="27" fill="#00646E" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="900" fontSize="24" letterSpacing="2px">
          SIEMENS
        </text>
      </svg>,
      'Siemens'
    );
  }

  // 23. Bosch
  if (query.includes('bosch')) {
    return wrap(
      <svg viewBox="0 0 160 40" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="22" cy="20" r="13" stroke="#EA1D25" strokeWidth="2.5" fill="none"/>
        <rect x="14" y="16" width="16" height="8" rx="2" stroke="#EA1D25" strokeWidth="2" fill="none"/>
        <text x="44" y="27" fill="#EA1D25" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="900" fontSize="22" letterSpacing="1px">
          BOSCH
        </text>
      </svg>,
      'Bosch'
    );
  }

  // 24. Qualcomm
  if (query.includes('qualcomm')) {
    return wrap(
      <svg viewBox="0 0 160 40" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        <text x="20" y="26" fill="#3253DC" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="900" fontSize="22" letterSpacing="-0.5px">
          Qualcomm
        </text>
      </svg>,
      'Qualcomm'
    );
  }

  // 25. NVIDIA
  if (query.includes('nvidia')) {
    return wrap(
      <svg viewBox="0 0 160 40" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* NVIDIA Green Spiral Eye */}
        <g transform="translate(10, 7)">
          <path d="M14 6 C 20 6, 25 11, 25 17 C 25 21, 21 24, 17 24 C 13 24, 11 21, 11 18 C 11 15, 14 13, 17 13" stroke="#76B900" strokeWidth="2.8" fill="none" strokeLinecap="round"/>
          <path d="M7 17 C 7 10, 12 4, 19 4" stroke="#76B900" strokeWidth="2.8" fill="none" strokeLinecap="round"/>
        </g>
        <text x="44" y="26" fill="#111" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="900" fontSize="20" letterSpacing="0.5px">
          NVIDIA
        </text>
      </svg>,
      'NVIDIA'
    );
  }

  // 26. Tech Mahindra
  if (query.includes('tech mahindra')) {
    return wrap(
      <svg viewBox="0 0 160 40" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g transform="translate(12, 10)">
          <circle cx="6" cy="10" r="4" fill="#E31837"/>
          <circle cx="16" cy="4" r="3" fill="#E31837"/>
          <circle cx="16" cy="16" r="3" fill="#E31837"/>
          <line x1="6" y1="10" x2="16" y2="4" stroke="#E31837" strokeWidth="1.8"/>
          <line x1="6" y1="10" x2="16" y2="16" stroke="#E31837" strokeWidth="1.8"/>
        </g>
        <text x="36" y="21" fill="#E31837" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="900" fontSize="14" letterSpacing="0.2px">
          Tech
        </text>
        <text x="36" y="30" fill="#333" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="800" fontSize="10" letterSpacing="0.8px">
          Mahindra
        </text>
      </svg>,
      'Tech Mahindra'
    );
  }

  // 27. HCLTech
  if (query.includes('hcl')) {
    return wrap(
      <svg viewBox="0 0 160 40" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        <text x="22" y="27" fill="#00A3E0" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="900" fontSize="23" letterSpacing="-0.5px">
          HCL<tspan fill="#6E2585">Tech</tspan>
        </text>
      </svg>,
      'HCLTech'
    );
  }

  // 28. LTIMindtree
  if (query.includes('ltimindtree') || query.includes('mindtree')) {
    return wrap(
      <svg viewBox="0 0 160 40" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g transform="translate(10, 8)">
          <path d="M4 14 C 4 6, 12 6, 14 12 C 16 18, 24 18, 24 10" stroke="#005EB8" strokeWidth="3" fill="none" strokeLinecap="round"/>
          <circle cx="24" cy="10" r="3" fill="#FF6A13"/>
        </g>
        <text x="42" y="25" fill="#005EB8" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="800" fontSize="17" letterSpacing="-0.3px">
          LTI<tspan fill="#FF6A13">Mindtree</tspan>
        </text>
      </svg>,
      'LTIMindtree'
    );
  }

  // 29. Reliance Jio
  if (query.includes('jio') || query.includes('reliance')) {
    return wrap(
      <svg viewBox="0 0 160 40" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="24" cy="20" r="14" fill="#0A2885"/>
        <text x="16" y="26" fill="white" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="900" fontSize="17" fontStyle="italic">
          Jio
        </text>
        <circle cx="17" cy="15" r="1.5" fill="#E11B22"/>
        <text x="44" y="25" fill="#0A2885" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="800" fontSize="17" letterSpacing="0.5px">
          Reliance Jio
        </text>
      </svg>,
      'Reliance Jio'
    );
  }

  // 30. Adani
  if (query.includes('adani')) {
    return wrap(
      <svg viewBox="0 0 160 40" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g transform="translate(12, 10)">
          <path d="M0 16 C 6 4, 14 4, 20 16" stroke="#107C41" strokeWidth="3" fill="none" strokeLinecap="round"/>
          <path d="M4 12 C 9 6, 15 6, 20 12" stroke="#0078D4" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
          <path d="M8 8 C 12 4, 16 4, 20 8" stroke="#D83B01" strokeWidth="2" fill="none" strokeLinecap="round"/>
        </g>
        <text x="40" y="25" fill="#1C3F73" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="800" fontSize="20" letterSpacing="-0.3px">
          adani
        </text>
      </svg>,
      'Adani Group'
    );
  }

  // 31. MIDHANI
  if (query.includes('midhani')) {
    return wrap(
      <svg viewBox="0 0 160 40" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        <polygon points="22,6 34,12 34,26 22,34 10,26 10,12" fill="#D97706" stroke="#B45309" strokeWidth="1.5"/>
        <circle cx="22" cy="19" r="4" fill="white"/>
        <text x="40" y="22" fill="#92400E" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="900" fontSize="14" letterSpacing="1px">
          MIDHANI
        </text>
        <text x="40" y="29" fill="#666" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="600" fontSize="6.5" letterSpacing="0.8px">
          MINISTRY OF DEFENCE
        </text>
      </svg>,
      'MIDHANI (Ministry of Defence)'
    );
  }

  // 32. Ernst & Young (EY)
  if (query.includes('ey') || query.includes('ernst')) {
    return wrap(
      <svg viewBox="0 0 160 40" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        <text x="24" y="28" fill="#111" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="900" fontSize="28" letterSpacing="-0.5px">
          EY
        </text>
        <polygon points="62,10 74,10 58,26 46,26" fill="#FFE600"/>
        <text x="70" y="24" fill="#666" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="600" fontSize="12" letterSpacing="0.5px">
          Building a better working world
        </text>
      </svg>,
      'EY (Ernst & Young)'
    );
  }

  // 33. PwC
  if (query.includes('pwc') || query.includes('pricewaterhouse')) {
    return wrap(
      <svg viewBox="0 0 160 40" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g transform="translate(10, 8)">
          <rect x="0" y="0" width="7" height="7" fill="#DC143C"/>
          <rect x="8" y="0" width="7" height="7" fill="#EB8C00"/>
          <rect x="0" y="8" width="7" height="7" fill="#E0301E"/>
          <rect x="8" y="8" width="7" height="7" fill="#FFB600"/>
        </g>
        <text x="32" y="25" fill="#2D2D2D" fontFamily="Georgia, serif" fontWeight="700" fontSize="22" letterSpacing="-0.5px">
          pwc
        </text>
      </svg>,
      'PwC'
    );
  }

  // 34. KPMG
  if (query.includes('kpmg')) {
    return wrap(
      <svg viewBox="0 0 160 40" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g transform="translate(16, 7)">
          <rect x="0" y="0" width="16" height="26" fill="#00338D" rx="2"/>
          <rect x="18" y="0" width="16" height="26" fill="#00338D" rx="2"/>
          <rect x="36" y="0" width="16" height="26" fill="#00338D" rx="2"/>
          <rect x="54" y="0" width="16" height="26" fill="#00338D" rx="2"/>
          <text x="4" y="19" fill="white" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="900" fontSize="16">K</text>
          <text x="21" y="19" fill="white" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="900" fontSize="16">P</text>
          <text x="38" y="19" fill="white" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="900" fontSize="15">M</text>
          <text x="56" y="19" fill="white" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="900" fontSize="16">G</text>
        </g>
      </svg>,
      'KPMG'
    );
  }

  // 35. Dell Technologies
  if (query.includes('dell')) {
    return wrap(
      <svg viewBox="0 0 160 40" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="24" cy="20" r="14" stroke="#007DB8" strokeWidth="2" fill="none"/>
        <text x="14" y="25" fill="#007DB8" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="900" fontSize="13" letterSpacing="0.5px">
          DELL
        </text>
        <text x="44" y="22" fill="#007DB8" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="800" fontSize="15" letterSpacing="0.2px">
          Technologies
        </text>
      </svg>,
      'Dell Technologies'
    );
  }

  // 36. HP
  if (query.includes('hp') || query.includes('hewlett')) {
    return wrap(
      <svg viewBox="0 0 160 40" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="24" cy="20" r="14" fill="#0096D6"/>
        <text x="16" y="26" fill="white" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="700" fontSize="18" fontStyle="italic" letterSpacing="-1px">
          hp
        </text>
        <text x="44" y="25" fill="#111" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="700" fontSize="16" letterSpacing="0.5px">
          Hewlett Packard
        </text>
      </svg>,
      'HP'
    );
  }

  // 37. SAP
  if (query.includes('sap')) {
    return wrap(
      <svg viewBox="0 0 160 40" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        <polygon points="12,8 52,8 44,32 12,32" fill="#008FD3"/>
        <text x="18" y="26" fill="white" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="900" fontSize="18" letterSpacing="1px">
          SAP
        </text>
      </svg>,
      'SAP'
    );
  }

  // 38. Schneider Electric
  if (query.includes('schneider')) {
    return wrap(
      <svg viewBox="0 0 160 40" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g transform="translate(10, 8)">
          <path d="M4 14 L 14 4 L 14 11 L 22 11 L 12 21 L 12 14 Z" fill="#3DCD58"/>
        </g>
        <text x="38" y="24" fill="#3DCD58" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="800" fontSize="15" letterSpacing="-0.2px">
          Schneider
        </text>
      </svg>,
      'Schneider Electric'
    );
  }

  // 39. Honeywell
  if (query.includes('honeywell')) {
    return wrap(
      <svg viewBox="0 0 160 40" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        <text x="18" y="26" fill="#EE3124" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="900" fontSize="20" letterSpacing="0.8px">
          Honeywell
        </text>
      </svg>,
      'Honeywell'
    );
  }

  // 40. Philips
  if (query.includes('philips')) {
    return wrap(
      <svg viewBox="0 0 160 40" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="22" cy="20" r="13" fill="#0B5ED7"/>
        <path d="M14 20 C 18 16, 26 24, 30 20" stroke="white" strokeWidth="2" fill="none"/>
        <text x="42" y="26" fill="#0B5ED7" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="900" fontSize="18" letterSpacing="1.2px">
          PHILIPS
        </text>
      </svg>,
      'Philips'
    );
  }

  // 41. Persistent Systems
  if (query.includes('persistent')) {
    return wrap(
      <svg viewBox="0 0 160 40" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g transform="translate(12, 10)">
          <circle cx="4" cy="10" r="3.5" fill="#FF6C00"/>
          <circle cx="14" cy="6" r="3.5" fill="#FF6C00"/>
          <circle cx="14" cy="14" r="3.5" fill="#777"/>
        </g>
        <text x="36" y="25" fill="#222" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="800" fontSize="17" letterSpacing="-0.3px">
          Persistent
        </text>
      </svg>,
      'Persistent Systems'
    );
  }

  // 42. Hexaware
  if (query.includes('hexaware')) {
    return wrap(
      <svg viewBox="0 0 160 40" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        <polygon points="18,10 26,10 30,17 26,24 18,24 14,17" fill="#00519E"/>
        <polygon points="26,17 34,17 38,24 34,31 26,31 22,24" fill="#74BA27"/>
        <text x="44" y="25" fill="#00519E" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="800" fontSize="17" letterSpacing="-0.2px">
          hexaware
        </text>
      </svg>,
      'Hexaware'
    );
  }

  // 43. KPIT
  if (query.includes('kpit')) {
    return wrap(
      <svg viewBox="0 0 160 40" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="12" y="8" width="24" height="24" rx="4" fill="#004B8D"/>
        <text x="15" y="25" fill="#8CC63F" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="900" fontSize="14" letterSpacing="0.5px">
          KPI
        </text>
        <text x="42" y="26" fill="#004B8D" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="900" fontSize="20" letterSpacing="1px">
          KPIT
        </text>
      </svg>,
      'KPIT'
    );
  }

  // Fallback: Elegant corporate monogram badge
  const initials = (logoText || name)
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase();

  return wrap(
    <svg viewBox="0 0 160 40" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="8" width="24" height="24" rx="6" fill="#1E293B"/>
      <text x="22" y="24" textAnchor="middle" fill="white" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="800" fontSize="12" letterSpacing="0.5px">
        {initials}
      </text>
      <text x="42" y="25" fill="#1E293B" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="700" fontSize="16" letterSpacing="-0.2px">
        {logoText || name}
      </text>
    </svg>,
    name
  );
};
