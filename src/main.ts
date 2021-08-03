import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";
const bootstrap = async () => {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            transform: true,
        }),
    );
    const config = new DocumentBuilder()
        .setTitle("CodeMark backend")
        .setDescription(
            "Backend API that allows you to manipulate with roles and users",
        )
        .setVersion("1.0")
        .addTag("codemark")
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup("api", app, document);
    await app.listen(3000);
};
bootstrap();
