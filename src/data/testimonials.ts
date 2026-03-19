export interface Testimonial {
  id: string;
  name: string;
  text: string;
  rating?: number; // 1-5, optional
  avatar?: string; // URL, optional
}

export const testimonials: Testimonial[] = [
  {
    id: 'thandi',
    name: 'Thandi Molefe',
    text: 'Stellies iCafe saved me during exam season. Fast printing, friendly staff, and the prices are student-friendly. Highly recommend!',
    rating: 5,
  },
  {
    id: 'pieter',
    name: 'Pieter van der Merwe',
    text: 'I get all my PSIRA renewals done here. The team is knowledgeable and the process is always smooth. Great service every time.',
    rating: 4,
    avatar: 'https://i.pravatar.cc/80?u=pieter',
  },
  {
    id: 'nomsa',
    name: 'Nomsa Dlamini',
    text: 'Needed passport photos urgently and they had them ready in minutes. Professional quality and very affordable.',
    rating: 5,
  },
  {
    id: 'james',
    name: 'James October',
    text: 'The gaming PCs are solid and the internet speed is excellent. Perfect spot to hang out and game with friends after class.',
    rating: 4,
    avatar: 'https://i.pravatar.cc/80?u=james',
  },
  {
    id: 'fatima',
    name: 'Fatima Isaacs',
    text: 'I completed my Skillwise computer training course here. The instructors are patient and the material is practical. Worth every cent.',
    rating: 5,
  },
  {
    id: 'sipho',
    name: 'Sipho Nkosi',
    text: 'Reliable courier service and helpful staff. I send parcels through them regularly for my small business. Never had an issue.',
    rating: 4,
  },
];
