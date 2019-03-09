import os.path,sys
sys.path.append(os.path.abspath(os.path.dirname(__file__))+'/../../')
import numpy as np
from keras.models import Model
from keras.layers import Dense, GlobalAveragePooling2D,Input
from keras.preprocessing.image import ImageDataGenerator
from keras.applications.vgg16 import VGG16
from keras.optimizers import SGD

N_CATEGORIES = 4
IMAGE_SIZE = 224
BATCH_SIZE = 16

def main():
    train_datagen = ImageDataGenerator(
        rescale=1.0 / 255,
        shear_range=0.2,
        zoom_range=0.2,
        horizontal_flip=True,
        rotation_range=10)

    test_datagen = ImageDataGenerator(
        rescale=1.0 / 255,
    )

    train_generator = train_datagen.flow_from_directory(
        'train',
        target_size=(IMAGE_SIZE, IMAGE_SIZE),
        batch_size=BATCH_SIZE,
        class_mode='categorical',
        shuffle=True
    )

    validation_generator = test_datagen.flow_from_directory(
        'validation',
        target_size=(IMAGE_SIZE, IMAGE_SIZE),
        batch_size=BATCH_SIZE,
        class_mode='categorical',
        shuffle=True
    )

    input_tensor = Input(shape=(IMAGE_SIZE, IMAGE_SIZE, 3))
    base_model = VGG16(weights='imagenet', include_top=False,input_tensor=input_tensor)

    x = base_model.output
    x = GlobalAveragePooling2D()(x)
    x = Dense(1024, activation='relu')(x)
    predictions = Dense(N_CATEGORIES, activation='softmax')(x)
    model = Model(inputs=base_model.input, outputs=predictions)

    for layer in base_model.layers[:15]:
        layer.trainable = False
    
    model.compile(optimizer=SGD(lr=0.0001, momentum=0.9), loss='categorical_crossentropy',metrics=['accuracy'])

    model.summary()

    model.fit_generator(train_generator,
        steps_per_epoch=160//BATCH_SIZE,
        epochs=50,
        verbose=1,
        validation_data=validation_generator,
        validation_steps=40//BATCH_SIZE,
    )

    model.save('listeningmonster.hdf5')


if __name__ == "__main__":
    main()

