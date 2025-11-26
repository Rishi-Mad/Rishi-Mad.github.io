import Card from '../components/card';

export default function ProjectsApp() {
    return (
        <div className="flex flex-col gap-6 h-full overflow-y-auto overflow-x-hidden pb-12" style={{ scrollBehavior: 'smooth' }}>
            <h1 className="text-3xl font-bold text-foreground pt-6">Projects</h1>

            {/* Software Engineering Section */}
            <section className="flex flex-col gap-4">
                <h2 className="text-xl font-semibold text-blue flex items-center gap-2">
                    <span className="w-1 h-6 bg-blue rounded-full" />
                    Software Engineering
                </h2>

                {/* In Progress */}
                <div className="flex flex-col gap-3">
                    <h3 className="text-sm font-medium text-yellow uppercase tracking-wide">In Progress</h3>

                    <Card hoverColor="blue">
                        <h4 className="text-lg font-semibold text-foreground mb-2">Neo-Alexandria</h4>
                        <p className="text-xs text-aqua mb-2">Python, TypeScript</p>
                        <p className="text-sm text-gray-1 leading-relaxed">
                            API-first knowledge platform with async document ingestion, hybrid vector + keyword search, 
                            explainable recommendations, and a mind-map style UI for exploring related content. Building 
                            the backend for low-latency retrieval and an admin dashboard for governance and analytics.
                        </p>
                    </Card>

                    <Card hoverColor="blue">
                        <h4 className="text-lg font-semibold text-foreground mb-2">Custom Chess Engine</h4>
                        <p className="text-xs text-aqua mb-2">C11</p>
                        <p className="text-sm text-gray-1 leading-relaxed">
                            Performance-oriented engine using 64-bit bitboards, legal move generation, Zobrist hashing, 
                            and perft-based correctness checks. Iterating on evaluation (PSTs, pawn structure, king safety) 
                            and time management with profiling to reduce runtime and memory.
                        </p>
                    </Card>
                </div>

                {/* Completed */}
                <div className="flex flex-col gap-3">
                    <h3 className="text-sm font-medium text-green uppercase tracking-wide">Completed</h3>

                    <Card hoverColor="green">
                        <h4 className="text-lg font-semibold text-foreground mb-2">Fit Friend</h4>
                        <p className="text-xs text-aqua mb-2">Python, React, Flask</p>
                        <p className="text-sm text-gray-1 leading-relaxed">
                            AI fitness coach that analyzes workout videos for form and safety. Uses pose tracking to score 
                            technique, count reps, detect fatigue, and generate personalized feedback. Includes key-frame 
                            capture, downloadable reports, and progress tracking.
                        </p>
                    </Card>

                    <Card hoverColor="green">
                        <h4 className="text-lg font-semibold text-foreground mb-2">AI Study Assistant (Study Pal)</h4>
                        <p className="text-xs text-aqua mb-2">Python, React, TypeScript</p>
                        <p className="text-sm text-gray-1 leading-relaxed">
                            Learning toolkit with transformer-based summarization, auto-flashcards, adaptive quizzes, and 
                            paraphrasing. Adds learning analytics and a modern, responsive UI with optional image-based 
                            question answering.
                        </p>
                    </Card>
                </div>
            </section>

            {/* Hardware Engineering Section */}
            <section className="flex flex-col gap-4 pb-6">
                <h2 className="text-xl font-semibold text-orange flex items-center gap-2">
                    <span className="w-1 h-6 bg-orange rounded-full" />
                    Hardware Engineering
                </h2>

                <div className="flex flex-col gap-3">
                    <Card hoverColor="orange">
                        <div className="flex items-start justify-between mb-2">
                            <h4 className="text-lg font-semibold text-foreground">System on Chip Extension Technologies</h4>
                            <span className="text-xs text-gray-2 whitespace-nowrap ml-4">Aug 2025 – Present</span>
                        </div>
                        <p className="text-xs text-purple mb-2">Researcher</p>
                        <ul className="text-sm text-gray-1 leading-relaxed space-y-1 list-disc list-inside">
                            <li>Leading a custom accelerator design for Dijkstra's Algorithm, bridging algorithmic theory and hardware</li>
                            <li>Implemented an assembly baseline and architected a timing-aware accelerator</li>
                            <li>Benchmarked runtime, energy, and area efficiency across multiple configurations</li>
                            <li>Documented design methodology and verification results for system-level scaling</li>
                        </ul>
                    </Card>

                    <Card hoverColor="orange">
                        <div className="flex items-start justify-between mb-2">
                            <h4 className="text-lg font-semibold text-foreground">Autonomous Motorsport Purdue</h4>
                            <span className="text-xs text-gray-2 whitespace-nowrap ml-4">Jan 2025 – Present</span>
                        </div>
                        <p className="text-xs text-purple mb-2">Hardware Developer</p>
                        <ul className="text-sm text-gray-1 leading-relaxed space-y-1 list-disc list-inside">
                            <li>Building electrical protection and power-management systems for autonomous race vehicles</li>
                            <li>Designed and fabricated a custom anti-spark PCB, verified via oscilloscope analysis</li>
                            <li>Constructed a battery pack with BMS integration and modular servicing</li>
                            <li>Performed fault-injection and endurance testing to validate safety under load</li>
                        </ul>
                    </Card>

                    <Card hoverColor="orange">
                        <div className="flex items-start justify-between mb-2">
                            <h4 className="text-lg font-semibold text-foreground">EPICS Medical Design Projects</h4>
                            <span className="text-xs text-gray-2 whitespace-nowrap ml-4">Jan 2025 – May 2025</span>
                        </div>
                        <p className="text-xs text-purple mb-2">Microcontroller Specialist</p>
                        <ul className="text-sm text-gray-1 leading-relaxed space-y-1 list-disc list-inside">
                            <li>Developed Arduino-based embedded systems for hospital equipment stress testing</li>
                            <li>Created actuator-driven fixtures to simulate cable fatigue</li>
                            <li>Built a spring-based cable-retraction system reducing strain and improving usability</li>
                            <li>Collaborated with IU Health Arnett Hospital for validation and deployment</li>
                        </ul>
                    </Card>
                </div>
            </section>
        </div>
    );
}
