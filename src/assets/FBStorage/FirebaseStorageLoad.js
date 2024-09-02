import { deleteObject, getDownloadURL, listAll, ref, uploadBytes  } from 'firebase/storage';
import { storage } from '../Firebase';

const rootUrl = "gs://testes-2998d.appspot.com/"

export const storageUploaddRoutes = {
    defaultFolder: `${rootUrl}Default`,
    pagesImages: `${rootUrl}ImagesForPages`,
    productsImages: `${rootUrl}ProductsImages`,
}
export const storageLoadRoutes = {
    defaultImage: `${rootUrl}Default/no-image.png`,
    presentationImage1: `${storageUploaddRoutes.pagesImages}/HomePageImg1.png`,
    presentationImage2: `${storageUploaddRoutes.pagesImages}/HomePageImg2.png`,
    presentationImage3: `${storageUploaddRoutes.pagesImages}/HomePageImg3.png`,
    myWorkCoverImage: `${storageUploaddRoutes.pagesImages}/MyWorkCoverImage.png`,
    aboutMeImage: `${storageUploaddRoutes.pagesImages}/AboutMePageImage.png`,
    productsImages: `${storageUploaddRoutes.productsImages}/`,
    sliderHomePage: `${storageUploaddRoutes.pagesImages}/HomePageSlider`,
    sliderAboutMe: `${storageUploaddRoutes.pagesImages}/AboutMeSlider`,
}

/* LOAD STORAGE */
export async function loadFromStorage(route) {
    const imageRef = ref(storage, route);
    const localStorageUrl = localStorage.getItem(route);

    // if localstorage was the file return it
    if (localStorageUrl) {
        return localStorageUrl;
    }
    // if not load from serve
    if (!localStorageUrl){
        const url = await getDownloadURL(imageRef);
        try {
            localStorage.setItem(route, url);
            return url;
        } catch (error) {
            return null;
        }
    }
}

/* UPLOAD IMAGE TO */
export async function uploadToStorage(file, fileName, route) {
    try {
        if (file) {
            const storageRef = ref(storage, `${route}/${fileName}.png`);
            await uploadBytes(storageRef, file, { contentType: 'image/png' })
                .then((snapshot) => {
                    console.log('Novo arquivo foi carregado com sucesso!');
                })
                .catch((error) => {
                    console.log("Erro ao fazer o upload:", error);
                });
        }
    } catch (error) {
        console.log("Erro ao processar o upload:", error);
    }
}



/* LOAD IMAGES TO SLIDER */
const generateHash = (data) => {
    return data.map(item => item.path).join('|');
};

export async function loadAllImagesFromFolder(route) {
    const folderRef = ref(storage, route);
    const storedDataKey = `images_${route}`;
    const storedHashKey = `images_hash_${route}`;

    // Tenta obter os dados armazenados e o hash
    const storedData = JSON.parse(localStorage.getItem(storedDataKey)) || [];
    const storedHash = localStorage.getItem(storedHashKey);

    try {
        const folderContents = await listAll(folderRef);
        
        // Filtra apenas arquivos de imagem, se necessário
        const imagePromises = folderContents.items.map(async (itemRef) => {
            try {
                const url = await getDownloadURL(itemRef);
                return { path: itemRef.fullPath, url };
            } catch (error) {
                console.error(`Erro ao obter URL de download para o arquivo ${itemRef.fullPath}:`, error);
                return null;
            }
        });

        // Aguarda a resolução de todas as promessas de URL
        const images = await Promise.all(imagePromises);
        const validImages = images.filter(image => image !== null);
        
        // Gera o hash dos dados recebidos
        const currentHash = generateHash(validImages);

        // Se o hash dos dados atuais for diferente do armazenado, atualiza o localStorage
        if (storedHash !== currentHash) {
            localStorage.setItem(storedDataKey, JSON.stringify(validImages));
            localStorage.setItem(storedHashKey, currentHash);
            console.log(`Imagens carregadas e localStorage atualizado: ${validImages.length}`);
        } else {
            console.log(`Dados já estão atualizados no localStorage: ${validImages.length}`);
        }

        return validImages;
    } catch (error) {
        console.error("Erro ao carregar imagens da pasta:", error);
        throw error;
    }
}

// Delete all files on the folder
export async function deleteAllFilesInFolder(route) {
    try {
        const folderRef = ref(storage, route);
        const folderContents = await listAll(folderRef);
        const deletePromises = folderContents.items.map((itemRef) =>
            deleteObject(itemRef).catch((error) => {
                console.log(`Erro ao deletar o arquivo ${itemRef.fullPath}:`, error);
                throw error;
            })
        );

        await Promise.all(deletePromises);
        console.log("Todos os arquivos antigos foram deletados.");
    } catch (error) {
        console.log("Erro ao deletar arquivos na pasta:", error);
        throw error; // Repassa o erro para a função de upload lidar com ele
    }
}

// // Get folder size
// async function countFilesInFolder(route) {
//     const folderRef = ref(storage, route);
//     try {
//         const folderContents = await listAll(folderRef);
//         const fileCount = folderContents.items.length;
//         return fileCount;
//     } catch (error) {
//         throw error;
//     }
// }