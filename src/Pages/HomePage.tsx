import NavBarTop from "../Components/common/ui/navBar/NavBarTop";
import { useTheme } from "../hooks/useTheme";

export default function HomePage() {
    const { isDarkMode, colors } = useTheme();
    
    return (
        <section 
            className=" h-screen w-full transition-colors duration-300"
            style={{ 
                backgroundColor: isDarkMode ? colors.background : colors.background,
                color: isDarkMode ? colors.primary: colors.neutral
            }}
            data-cy="home-section"
        >   
            <NavBarTop />
        </section>
    );
}