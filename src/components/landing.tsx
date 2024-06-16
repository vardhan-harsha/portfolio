import BlurIn from '../@ui/blur-in';

export default function Landing() {
    return (
        <div className="flex-auto pointer-events-none z-10 bg-black">
            <BlurIn
                word="Harsha Vardhan Moka"
                className="text-4xl  font-bold text-black dark:text-white"
            />
        </div>
    )
}