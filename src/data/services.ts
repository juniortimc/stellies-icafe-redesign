export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string; // Lucide icon name
}

export const services: Service[] = [
  { id: 'documents', title: 'Document Services', description: 'Printing, scanning, emailing, laminating, and binding', icon: 'Printer' },
  { id: 'photos', title: 'ID/Visa Photos', description: 'Quick and professional ID, passport, and visa photos', icon: 'Camera' },
  { id: 'designing', title: 'Designing', description: 'Flyers, business cards, and invitations', icon: 'PenTool' },
  { id: 'tshirt-sticker', title: 'T-shirt & Sticker', description: 'Custom designs made just for you', icon: 'Shirt' },
  { id: 'repairs', title: 'Computer Repairs', description: 'Repairs, upgrades, and general maintenance', icon: 'Wrench' },
  { id: 'web-app', title: 'Website & App Design', description: 'Sleek, modern digital presence', icon: 'Globe' },
  { id: 'courier', title: 'Courier Services', description: 'Professional parcel handling', icon: 'Truck' },
  { id: 'internet', title: 'Internet', description: 'Fast, reliable work and gaming stations', icon: 'Wifi' },
  { id: 'training', title: 'Computer Training', description: 'Friendly beginner courses', icon: 'GraduationCap' },
  { id: 'pc-gaming', title: 'PC Usage & Gaming', description: 'Comfy, tech-friendly workspace', icon: 'Monitor' },
  { id: 'psira', title: 'PSIRA Renewals', description: 'Simple compliance assistance', icon: 'ShieldCheck' },
  { id: 'online-apps', title: 'Online Applications', description: 'Assistance with digital tasks', icon: 'FileText' },
  { id: 'cv', title: 'CV Designing', description: 'Professionally designed CVs', icon: 'FileCheck' },
  { id: 'tenders', title: 'Tender & Profiles', description: 'Business documents and company profiles', icon: 'Briefcase' },
  { id: 'coffee', title: 'Coffee & Café', description: 'Great coffee while you wait', icon: 'Coffee' },
  { id: 'branding', title: 'Corporate Branding', description: 'Full-scale brand identity', icon: 'Palette' },
];
