import random
from settings import CELL_SIZE, WINDOW_WIDTH, WINDOW_HEIGHT

def get_random_position(exclude_positions=[]):
    while True:
        x = random.randint(0, (WINDOW_WIDTH // CELL_SIZE) - 1) * CELL_SIZE
        y = random.randint(0, (WINDOW_HEIGHT // CELL_SIZE) - 1) * CELL_SIZE
        if (x, y) not in exclude_positions:
            return (x, y)

def draw_text_center(screen, text, font_size, color):
    import pygame
    font = pygame.font.SysFont(None, font_size)
    rendered_text = font.render(text, True, color)
    rect = rendered_text.get_rect(center=(WINDOW_WIDTH // 2, WINDOW_HEIGHT // 2))
    screen.blit(rendered_text, rect)
