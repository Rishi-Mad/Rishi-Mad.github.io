import Card from '../components/card';

export default function ProfileApp() {
    return (
        <div className="flex flex-col gap-6 h-full pb-12">
            <h1 className="text-3xl font-bold text-foreground">About Me</h1>

            {/* Introduction */}
            <section className="flex flex-col gap-4">
                <h2 className="text-xl font-semibold text-aqua flex items-center gap-2">
                    <span className="w-1 h-6 bg-aqua rounded-full" />
                    Introduction
                </h2>
                <Card hoverColor="aqua">
                    <p className="text-base text-gray-1 leading-relaxed">
                        I'm <span className="text-foreground font-semibold">Rishi Madipalli</span>, a Computer Engineering 
                        student at <span className="text-blue">Purdue University</span>, passionate about blending hardware 
                        design, embedded systems, and software engineering to build efficient, intelligent technology. I love 
                        working at the boundary between silicon and software, where circuits meet algorithms and code drives 
                        hardware behavior. Whether I'm designing an accelerator, tuning embedded logic, or developing full-stack 
                        applications, my goal is to make systems smarter, faster, and more reliable.
                    </p>
                </Card>
            </section>

            {/* Internship Experience */}
            <section className="flex flex-col gap-4">
                <h2 className="text-xl font-semibold text-green flex items-center gap-2">
                    <span className="w-1 h-6 bg-green rounded-full" />
                    Internship Experience
                </h2>

                <Card hoverColor="green">
                    <div className="flex items-start justify-between mb-2">
                        <div>
                            <h4 className="text-lg font-semibold text-foreground">Software Engineering Intern (Full-Stack)</h4>
                            <p className="text-sm text-purple">Fisker IT</p>
                        </div>
                        <span className="text-xs text-gray-2 whitespace-nowrap ml-4">May 2025 – Aug 2025</span>
                    </div>
                    <p className="text-sm text-gray-1 leading-relaxed mb-3">
                        At Fisker IT, I led development of the company's first official website and internal tools, focusing 
                        on scalability, speed, and maintainability.
                    </p>
                    <ul className="text-sm text-gray-1 leading-relaxed space-y-1 list-disc list-inside">
                        <li>Architected a full-stack solution using React, TypeScript, and Python Flask, integrating a reusable component library and modular design system</li>
                        <li>Built a responsive UI from Figma prototypes with pixel-perfect execution and accessibility best practices</li>
                        <li>Implemented secure client-intake flows and dynamic routing with stateful hooks for smooth navigation</li>
                        <li>Deployed with Vite for lightning-fast hot-module replacement and optimized build performance</li>
                        <li>Collaborated directly with the CTO to define technical standards and improve development workflows</li>
                    </ul>
                    <p className="text-sm text-gray-1 leading-relaxed mt-3 italic">
                        This internship deepened my understanding of software scalability and front-end architecture, and 
                        strengthened my appreciation for how design, performance, and engineering come together in production systems.
                    </p>
                </Card>
            </section>

            {/* Interests & Passions */}
            <section className="flex flex-col gap-4 pb-6">
                <h2 className="text-xl font-semibold text-yellow flex items-center gap-2">
                    <span className="w-1 h-6 bg-yellow rounded-full" />
                    Interests & Passions
                </h2>
                <Card hoverColor="yellow">
                    <p className="text-base text-gray-1 leading-relaxed mb-3">
                        My interests center around <span className="text-orange font-medium">ASIC and hardware design</span>, 
                        <span className="text-orange font-medium"> embedded systems</span>, and 
                        <span className="text-orange font-medium"> intelligent automation</span>. I'm fascinated by how 
                        low-level engineering and high-level intelligence can work in harmony — from logic gates to 
                        machine-learning-driven decision-making. I aspire to design systems that merge efficiency, adaptability, 
                        and real-time perception, creating technology that's both powerful and human-centered.
                    </p>
                    <p className="text-base text-gray-1 leading-relaxed">
                        Ultimately, I want to contribute to innovations in <span className="text-aqua font-medium">hardware-accelerated AI</span>, 
                        <span className="text-aqua font-medium"> autonomous embedded platforms</span>, and 
                        <span className="text-aqua font-medium"> smart system architectures</span> that redefine what's possible 
                        at the intersection of hardware and intelligence.
                    </p>
                </Card>
            </section>
        </div>
    );
}
