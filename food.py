import pygame
from settings import *
from utils import get_random_position

class Food:
    def __init__(self):
        self.position = (0, 0)

    def randomize(self, snake_body):
        self.position = get_random_position(snake_body)

    def draw(self, screen):
        pygame.draw.rect(screen, FOOD_COLOR, 
                        pygame.Rect(self.position[0], self.position[1], CELL_SIZE, CELL_SIZE))
        highlight_rect = pygame.Rect(self.position[0] + 4, self.position[1] + 4, 
                                    CELL_SIZE // 3, CELL_SIZE // 3)
        pygame.draw.rect(screen, FOOD_HIGHLIGHT, highlight_rect)
