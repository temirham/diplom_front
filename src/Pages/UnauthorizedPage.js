import { useNavigate } from 'react-router-dom';
import { Container, Typography, Button} from "@mui/material";
import { motion } from "framer-motion";

function UnauthorizedPage() {
    const navigate = useNavigate();

    function handleClick() {
        navigate('/login');
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            <Container maxWidth="sm" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
                <Typography variant="h4" align="center" paragraph sx={{ fontFamily: "NunitoSansExtraLightFont", color: "text.text2", mb: 4 }}>
                    Приветствуем Вас на сервисе классификации тех процессов!
                </Typography>
                <Button
                    variant="contained"
                    onClick={handleClick}
                    sx={{ backgroundColor: 'secondary.button', fontFamily: 'GenshinFont', mb: 2, px: '40px', py: '20px', borderRadius: '26px' }}
                >
                    Вход
                </Button>
            </Container>
        </motion.div>
    )
}

export default UnauthorizedPage;
