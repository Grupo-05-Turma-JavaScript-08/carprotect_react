import { motion } from "framer-motion";

export type SupportPerson = {
  name: string;
  role?: string;
  email?: string;
  linkedin?: string;
  avatarUrl?: string;
};

const supportTeam: SupportPerson[] = [
  { name: "Evertton", role: "Desenvolvedor", email: "dev.ewerttongoncalves@gmail.com", linkedin: "https://www.linkedin.com/in/ewerttongoncalves/", avatarUrl: " https://i.ibb.co/MDFd3yTw/Image-29.jpg" },
  { name: "Felipe", role: "Desenvolvedor", email: "felipealves.santos93@gmail.com", linkedin: "https://www.linkedin.com/in/felipe-alves-949a58296/", avatarUrl: " https://i.ibb.co/cKBFYXc2/Image-35.jpg" },
  { name: "Gabriel", role: "Desenvolvedor", email: "gmartins9042@gmail.com", linkedin: "https://www.linkedin.com/in/gabrielmartins-/", avatarUrl: "https://i.ibb.co/ZpPT0fvs/Image-32.jpg" },
  { name: "Larrisa", role: "Desenvolvedora", email: "rrs.larissa@gmail.com", linkedin: "https://www.linkedin.com/in/larissa-r-ruiz/", avatarUrl: "https://i.ibb.co/fGD4ggFS/Image-34.jpg" },
  { name: "Matheus", role: "Desenvolvedor", email: "matheus97p.q@gmail.com", linkedin: "https://www.linkedin.com/in/matheuspx97/", avatarUrl: "https://i.ibb.co/kVSH3yGF/Image-31.jpg" },
  { name: "Micheli", role: "Desenvolvedora", email: "michelimelki@gmail.com", linkedin: "https://www.linkedin.com/in/micheli-martins/", avatarUrl: "https://i.ibb.co/6Rtq0stv/Image-33.jpg" },
  { name: "Viviane", role: "Desenvolvedora", email: "vjsantos.viviane@gmail.com", linkedin: "https://www.linkedin.com/in/vsantosj/", avatarUrl: "https://i.ibb.co/CpkVrCSf/Image-30.jpg" }
];

export default function SupportTeamCard() {
  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="bg-white/80 backdrop-blur-sm shadow-lg rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-2xl font-semibold">Equipe de Suporte</h3>
            <p className="text-sm text-slate-500">Estamos prontos para te ajudar — escolha um contato abaixo.</p>
          </div>
          <div className="text-sm text-slate-400">{supportTeam.length} agentes online</div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {supportTeam.map((person, index) => (
            <motion.article
              key={index}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: index * 0.04 }}
              className="flex gap-3 p-3 rounded-xl border border-slate-100 hover:shadow-md hover:scale-[1.01] transition-transform bg-white"
            >
              <img
                src={person.avatarUrl}
                alt={`Foto de ${person.name}`}
                className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-sm"
              />
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="font-medium">{person.name}</div>
                  <div className="text-xs text-slate-500">{person.role}</div>
                </div>
                <div className="mt-2 flex flex-col gap-1 text-xs">
                  {person.email && (
                    <a
                      href={`mailto:${person.email}`}
                      className="flex items-center gap-1 px-2 py-1 rounded-md hover:bg-slate-50 text-blue-700"
                      aria-label={`Enviar email para ${person.name}`}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path d="M3 8.5L12 13L21 8.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M21 6H3V18H21V6Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <span className="truncate max-w-[8rem]">{person.email}</span>
                    </a>
                  )}
                  {person.linkedin && (
                    <a
                      href={person.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 px-2 py-1 rounded-md hover:bg-slate-50 text-blue-700"
                      aria-label={`Visitar LinkedIn de ${person.name}`}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                        <rect x="2" y="9" width="4" height="12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                        <circle cx="4" cy="4" r="2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <span className="truncate max-w-[8rem]">LinkedIn</span>
                    </a>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="mt-4 text-xs text-slate-500">Se preferir, fale com nosso atendimento 24/7 pelo chat do site.</div>
      </div>
    </div>
  );
}