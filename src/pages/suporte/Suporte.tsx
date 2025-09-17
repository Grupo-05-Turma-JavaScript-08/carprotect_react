import { motion } from "framer-motion";

export type SupportPerson = {
  name: string;
  role?: string;
  email?: string;
  linkedin?: string;
  avatarUrl?: string;
};

const supportTeam: SupportPerson[] = [
  { name: "Evertton", role: "Desenvolvedor", email: "dev.ewerttongoncalves@gmail.com", linkedin: "https://www.linkedin.com/in/ewerttongoncalves/", avatarUrl: "https://i.ibb.co/MDFd3yTw/Image-29.jpg" },
  { name: "Felipe", role: "Desenvolvedor", email: "felipealves.santos93@gmail.com", linkedin: "https://www.linkedin.com/in/felipe-alves-949a58296/", avatarUrl: "https://i.ibb.co/cKBFYXc2/Image-35.jpg" },
  { name: "Gabriel", role: "Desenvolvedor", email: "gmartins9042@gmail.com", linkedin: "https://www.linkedin.com/in/gabrielmartins-/", avatarUrl: "https://i.ibb.co/ZpPT0fvs/Image-32.jpg" },
  { name: "Larrisa", role: "Desenvolvedora", email: "rrs.larissa@gmail.com", linkedin: "https://www.linkedin.com/in/larissa-r-ruiz/", avatarUrl: "https://i.ibb.co/fGD4ggFS/Image-34.jpg" },
  { name: "Matheus", role: "Desenvolvedor", email: "matheus97p.q@gmail.com", linkedin: "https://www.linkedin.com/in/matheuspx97/", avatarUrl: "https://i.ibb.co/kVSH3yGF/Image-31.jpg" },
  { name: "Micheli", role: "Desenvolvedora", email: "michelimelki@gmail.com", linkedin: "https://www.linkedin.com/in/micheli-martins/", avatarUrl: "https://i.ibb.co/6Rtq0stv/Image-33.jpg" },
  { name: "Viviane", role: "Desenvolvedora", email: "vjsantos.viviane@gmail.com", linkedin: "https://www.linkedin.com/in/vsantosj/", avatarUrl: "https://i.ibb.co/CpkVrCSf/Image-30.jpg" }
];

export default function SupportTeamCard() {
  return (
    <div className="min-h-screen flex flex-col items-center p-4 sm:p-6 font-sans bg-gradient-to-br from-[#f7f9fb] to-[#e8eef3]">
      
      <div className="w-full max-w-6xl mb-12 text-center mt-8">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-[#034153]">Equipe de Suporte</h1>
        <p className="text-lg text-[#056174]">
          Estamos prontos para te ajudar — escolha um contato abaixo.
        </p>
        <p className="text-sm text-[#678391] mt-2">{supportTeam.length} agentes online</p>
      </div>

      <div className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {supportTeam.map((person, index) => (
          <motion.article
            key={index}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="bg-white p-6 rounded-2xl shadow-md flex flex-col items-center text-center border-t-4 border-[#034153] transition-all duration-300 hover:scale-105 hover:shadow-xl"
          >
            <img
              src={person.avatarUrl}
              alt={`Foto de ${person.name}`}
              className="w-20 h-20 rounded-full object-cover border-4 border-[#e8f4f8] shadow-sm mb-4"
            />
            <h3 className="font-bold text-lg text-[#034153]">{person.name}</h3>
            <p className="text-sm text-[#678391] mb-3">{person.role}</p>

            <div className="flex flex-col gap-2 text-sm w-full">
              {person.email && (
                <a
                  href={`mailto:${person.email}`}
                  className="flex  items-center  justify-center gap-2 px-5   py-2 rounded-md bg-[#e8f4f8] text-[#034153] hover:bg-[#d0e9f1] transition"
                >
                  ✉ Email
                </a>
              )}
              {person.linkedin && (
                <a
                  href={person.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-3 py-2 rounded-md bg-[#e8f4f8] text-[#034153] hover:bg-[#d0e9f1] transition"
                >
                  🔗 LinkedIn
                </a>
              )}
            </div>
          </motion.article>
        ))}
      </div>
      

      <div className="mt-12 text-center text-sm text-[#678391]">
        Se preferir, fale com nosso atendimento 24/7 pelo chat do site.
      </div>
    </div>
  );
}
