export interface Service { number: string; title: string; description: string; icon: string; color: string; result: string; }
export interface CaseStudy { client: string; industry: string; services: string[]; result: string; description: string; metrics: { label: string; value: string }[]; }
export interface LeadFormData { name: string; phone: string; email?: string; company?: string; service_interested?: string; message?: string; }
